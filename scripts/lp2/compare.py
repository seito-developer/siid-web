#!/usr/bin/env python3
"""実装のスクリーンショットと PSD の基準画像を比較し、デザイン一致率を算出する。

docs/spec/07_lp2-renewal.md §13.1 / §13.2 の完了条件をレビューエージェントが
機械的に判定するためのツール。

  python3 scripts/lp2/compare.py \\
      --reference tmp/psd-ref/pc/pc1.png \\
      --actual    tmp/shots/pc-fv.png \\
      --out       tmp/diff/pc-fv.png

## 2 軸で判定する理由

単一の指標では「わずかな位置ずれを許容する」ことと「色の誤差を検出する」ことを
両立できない。位置ずれは輪郭に局所的な大きい差を生み、色ずれは全体に小さい差を
生むためで、許容値を上げると色ずれを見逃し、下げると数 px のずれで落ちてしまう。
そこで性質の異なる 2 つの指標を独立に算出し、両方の合格を求める。

### 構造一致率(既定の合格ライン 85%)

弱いぼかし(4px)をかけたうえで、画素の最大チャンネル差が許容値(24)以内の
画素の割合。レイアウト・要素の有無・サイズの誤りを検出する。

### 色一致率(既定の合格ライン 85%)

強いぼかし(24px)で高周波成分を落としてから幅 60px まで縮小し、許容値 8 で比較する。
位置の影響をほぼ受けず、配色・階調の誤りを検出する。

判定は**基準画像側で平坦なセル(局所の標準偏差が 20 以下 = 背景やパネル)に限る**。
文字が乗るセルを含めると、Photoshop とブラウザで文字のラスタライズが異なるだけで
平均色がずれ、配色が正しくても数値が落ちてしまうため。文字の再現度は構造一致率で
判定しており、色軸で二重に減点する必要はない。

## 較正結果(pc1.psd を基準にした実測)

| 比較対象           | 構造一致率 | 色一致率 |
|--------------------|-----------|---------|
| 完全一致           |  100.00%  | 100.00% |
| 全体を 3px ずらす  |   88.32%  |  95.36% |
| 明度を 6% 上げる   |  100.00%  |  71.33% |
| 幅 1200px で撮影   |   99.70%  |  97.62% |
| 別セクション(pc3)  |   14.20%  |   7.13% |

高さが一致しない場合、短い方をデザインに使われない色(マゼンタ)で埋めて
全体を比較する。高さのずれ自体が実装の誤りであるため減点対象とする。

終了コード: 両方の指標が合格なら 0、どちらかが不足なら 1。
"""

from __future__ import annotations

import argparse
import json
import os
import sys

try:
    import numpy as np
    from PIL import Image, ImageFilter
except ImportError:  # pragma: no cover
    sys.exit("依存が不足しています: pip install -r scripts/lp2/requirements.txt")


PAD_COLOR = (255, 0, 255)  # 埋めた領域が必ず不一致になるよう、デザインに使われない色を使う

STRUCTURE_BLUR = 4.0
STRUCTURE_TOLERANCE = 24
COLOR_BLUR = 24.0
COLOR_WIDTH = 60
COLOR_TOLERANCE = 8
# 基準画像側で「平坦」とみなす局所標準偏差の上限。これを超えるセル(文字など)は色判定から外す
COLOR_FLAT_STD = 20.0


def _load(path: str) -> Image.Image:
    if not os.path.exists(path):
        sys.exit(f"ファイルがありません: {path}")
    return Image.open(path).convert("RGB")


def _align(reference: Image.Image, actual: Image.Image) -> tuple[Image.Image, Image.Image, int, int]:
    """actual を reference の幅に合わせ、短い方を埋めて高さを揃える。"""
    ref_w, ref_h = reference.size
    act_w, act_h = actual.size

    if act_w != ref_w:
        actual = actual.resize((ref_w, max(1, round(act_h * ref_w / act_w))), Image.LANCZOS)
    act_h = actual.size[1]

    height = max(ref_h, act_h)
    for name in ("reference", "actual"):
        image = reference if name == "reference" else actual
        if image.size[1] != height:
            padded = Image.new("RGB", (ref_w, height), PAD_COLOR)
            padded.paste(image, (0, 0))
            if name == "reference":
                reference = padded
            else:
                actual = padded

    return reference, actual, ref_h, act_h


def _structure_ratio(reference: Image.Image, actual: Image.Image, tolerance: int, blur: float):
    a = np.asarray(reference.filter(ImageFilter.GaussianBlur(blur)), dtype=np.int16)
    b = np.asarray(actual.filter(ImageFilter.GaussianBlur(blur)), dtype=np.int16)
    diff = np.abs(a - b)
    match = diff.max(axis=2) <= tolerance
    return float(match.mean()), float(diff.mean()), match


def _flat_mask(reference: Image.Image, target_h: int) -> np.ndarray:
    """基準画像側で平坦なセル(= 背景やパネル)を True にしたマスクを返す。

    各セルを 4x4 に分けて標準偏差を取る。細い文字が乗るセルは分散が大きくなるため
    除外され、色判定が文字のラスタライズ差に引きずられなくなる。
    """
    fine_w = COLOR_WIDTH * 4
    fine_h = target_h * 4
    fine = np.asarray(
        reference.resize((fine_w, fine_h), Image.LANCZOS), dtype=np.float32
    )
    cells = fine.reshape(target_h, 4, COLOR_WIDTH, 4, 3)
    std = cells.std(axis=(1, 3)).max(axis=2)
    return std <= COLOR_FLAT_STD


def _color_ratio(reference: Image.Image, actual: Image.Image) -> tuple[float, float]:
    width, height = reference.size
    target_h = max(1, round(height * COLOR_WIDTH / width))

    def reduce(image: Image.Image) -> np.ndarray:
        blurred = image.filter(ImageFilter.GaussianBlur(COLOR_BLUR))
        return np.asarray(blurred.resize((COLOR_WIDTH, target_h), Image.LANCZOS), dtype=np.int16)

    diff = np.abs(reduce(reference) - reduce(actual)).max(axis=2)
    mask = _flat_mask(reference, target_h)
    if not mask.any():
        # 平坦なセルが無いほど密なセクションでは全セルで判定する
        return float((diff <= COLOR_TOLERANCE).mean()), 1.0
    return float((diff[mask] <= COLOR_TOLERANCE).mean()), float(mask.mean())


def compare(
    reference_path: str,
    actual_path: str,
    out_path: str | None = None,
    ref_crop: tuple[int, int] | None = None,
) -> dict:
    reference = _load(reference_path)
    if ref_crop:
        # PSD 1 枚に複数セクションが入っているため、比較したいセクションだけを切り出す。
        # 全ページで比べると、あるセクションの高さのずれが以降すべてを不一致にしてしまい、
        # どこが悪いのか分からない数値になる。
        top, bottom = ref_crop
        reference = reference.crop((0, top, reference.width, min(bottom, reference.height)))
    actual = _load(actual_path)
    reference, actual, ref_h, act_h = _align(reference, actual)

    structure, mean_error, match_mask = _structure_ratio(
        reference, actual, STRUCTURE_TOLERANCE, STRUCTURE_BLUR
    )
    color, flat_share = _color_ratio(reference, actual)

    if out_path:
        os.makedirs(os.path.dirname(os.path.abspath(out_path)) or ".", exist_ok=True)
        # 不一致画素を赤く重ねたヒートマップ。どこがずれているか目視できるようにする。
        overlay = np.asarray(reference, dtype=np.uint8).copy()
        mismatch = ~match_mask
        overlay[mismatch] = (
            overlay[mismatch] * 0.25 + np.array([255, 0, 0], dtype=np.float64) * 0.75
        ).astype(np.uint8)
        Image.fromarray(overlay).save(out_path)

    return {
        "structure_ratio": structure * 100,
        "color_ratio": color * 100,
        "color_flat_share": flat_share * 100,
        "mean_error": mean_error,
        "reference_height": ref_h,
        "actual_height": act_h,
        "height_delta": act_h - ref_h,
        "width": reference.size[0],
        "diff_image": out_path,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--reference", required=True, help="PSD から書き出した基準画像")
    parser.add_argument("--actual", required=True, help="実装のスクリーンショット")
    parser.add_argument("--out", help="差分ヒートマップの出力先")
    parser.add_argument("--structure-threshold", type=float, default=85.0)
    parser.add_argument("--color-threshold", type=float, default=85.0)
    parser.add_argument(
        "--ref-crop",
        help="基準画像を縦方向に切り出してから比較する(例: 782:1237)。"
        "PSD 1 枚に複数セクションが入っている場合にセクション単位で判定するために使う",
    )
    parser.add_argument("--json", action="store_true", help="結果を JSON で出力する")
    args = parser.parse_args()

    ref_crop = None
    if args.ref_crop:
        top, _, bottom = args.ref_crop.partition(':')
        ref_crop = (int(top), int(bottom))

    result = compare(args.reference, args.actual, args.out, ref_crop)
    structure_ok = result["structure_ratio"] >= args.structure_threshold
    color_ok = result["color_ratio"] >= args.color_threshold
    result["structure_pass"] = structure_ok
    result["color_pass"] = color_ok
    result["pass"] = structure_ok and color_ok

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=1))
    else:
        print(f"基準画像 : {args.reference}  高さ {result['reference_height']}px")
        print(f"実装      : {args.actual}  高さ {result['actual_height']}px")
        if result["height_delta"]:
            print(f"高さの差 : {result['height_delta']:+d}px  ※余白として不一致に計上")
        print(f"平均誤差 : {result['mean_error']:.2f} / 255")
        print(
            f"構造一致率: {result['structure_ratio']:6.2f}%  "
            f"(合格ライン {args.structure_threshold}%)  {'合格' if structure_ok else '不合格'}"
        )
        print(
            f"色一致率  : {result['color_ratio']:6.2f}%  "
            f"(合格ライン {args.color_threshold}% / 平坦セル {result['color_flat_share']:.0f}%)  "
            f"{'合格' if color_ok else '不合格'}"
        )
        if result["diff_image"]:
            print(f"差分画像 : {result['diff_image']}")
        print(f"判定      : {'合格' if result['pass'] else '不合格'}")

    sys.exit(0 if result["pass"] else 1)


if __name__ == "__main__":
    main()
