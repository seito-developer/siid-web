#!/usr/bin/env python3
"""LP リニューアル(/siid/lp-2)用の PSD 解析・書き出しツール。

入稿された Photoshop データ(docs/spec/07_lp2-renewal.md §2)から、実装に必要な
情報とアセットを取り出す。PSD 本体は容量が大きいためリポジトリには含めない。

サブコマンド:

  data      PSD のレイヤーツリーを JSON 化する(座標・スタイル・テキスト全文)
  render    PSD を合成して PNG に書き出す(デザイン差分判定の基準画像)
  tree      レイヤーツリーを標準出力に表示する(調査用)
  export    レイヤー/グループを 1 枚の画像として書き出す
  manifest  マニフェストに従ってアセットを一括書き出しする

使用例:

  python3 scripts/lp2/psd_tool.py data   ~/Downloads/260902_seitosama/pc --out-dir tmp/psd-data/pc
  python3 scripts/lp2/psd_tool.py render ~/Downloads/260902_seitosama/pc --out-dir tmp/psd-ref/pc
  python3 scripts/lp2/psd_tool.py tree   ~/Downloads/260902_seitosama/pc/pc1.psd
  python3 scripts/lp2/psd_tool.py export ~/Downloads/260902_seitosama/pc/pc1.psd \\
      --path 'fv/medal/1' --out public/images/lp-2/fv-medal-1.webp

依存: scripts/lp2/requirements.txt
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import math
import os
import sys
from typing import Any, Iterable

try:
    from psd_tools import PSDImage
except ImportError:  # pragma: no cover
    sys.exit("psd-tools が必要です: pip install -r scripts/lp2/requirements.txt")


# --- テキストレイヤーのスタイル抽出 -----------------------------------------

def _num(value: Any) -> Any:
    """psd-tools が返す独自数値型を JSON 化できる値に落とす。"""
    if value is None:
        return None
    try:
        f = float(value)
    except (TypeError, ValueError):
        return str(value)
    return int(f) if f == int(f) else round(f, 3)


def _hex(values: Iterable[Any]) -> str:
    vals = list(values)
    return "#%02X%02X%02X" % tuple(int(round(float(v) * 255)) for v in vals[1:4])


def _layer_scale(layer: Any) -> float:
    """レイヤーの変形行列からスケール倍率を求める。

    Photoshop はフォントサイズを「変形前」のポイント数で保持するため、
    変形行列を掛けないと実表示サイズを誤る(§5.3)。
    """
    transform = getattr(layer, "transform", None)
    if not transform:
        return 1.0
    a, b, c, d = (float(transform[i]) for i in range(4))
    scale = math.sqrt(abs(a * d - b * c))
    return scale or 1.0


def _type_info(layer: Any) -> dict:
    try:
        engine = layer.engine_dict
        style = engine["StyleRun"]["RunArray"][0]["StyleSheet"]["StyleSheetData"]
        font_set = layer.resource_dict.get("FontSet")
        font_index = style.get("Font")
        font = None
        if font_set and font_index is not None and font_index < len(font_set):
            font = str(font_set[font_index].get("Name")).strip("'")

        scale = _layer_scale(layer)
        size = float(style.get("FontSize", 0))
        leading = style.get("Leading")
        fill = style.get("FillColor")
        tracking = _num(style.get("Tracking"))

        return {
            "text": layer.text,
            "font": font,
            "font_size_px": round(size * scale, 2),
            "font_size_raw": round(size, 2),
            "transform_scale": round(scale, 4),
            "tracking": tracking,
            "letter_spacing_em": round(tracking / 1000, 4) if tracking is not None else None,
            "line_height_px": round(float(leading) * scale, 2) if leading else None,
            "color": _hex(fill["Values"]) if fill else None,
        }
    except Exception as exc:  # noqa: BLE001 - 解析不能なレイヤーは握りつぶして記録する
        return {"error": f"{type(exc).__name__}: {exc}"}


# --- レイヤーツリー ----------------------------------------------------------

def _node(layer: Any) -> dict:
    node = {
        "name": layer.name,
        "kind": layer.kind,
        "bbox": list(layer.bbox),
        "visible": bool(layer.visible),
        "opacity": int(layer.opacity),
        "blend_mode": str(layer.blend_mode),
    }
    if layer.kind == "type":
        node["type"] = _type_info(layer)
    if layer.is_group():
        node["children"] = [_node(child) for child in layer]
    return node


def _psd_files(target: str) -> list[str]:
    if os.path.isfile(target):
        return [target]
    files: list[str] = []
    for name in sorted(os.listdir(target)):
        if name.lower().endswith((".psd", ".psb")):
            files.append(os.path.join(target, name))
    return files


def _iter_layers(layers: Iterable[Any], prefix: str = ""):
    """(パス, レイヤー) を再帰的に返す。アートボードはパスに含めない。"""
    for layer in layers:
        if layer.kind == "artboard":
            yield from _iter_layers(layer, prefix)
            continue
        path = f"{prefix}/{layer.name}" if prefix else layer.name
        yield path, layer
        if layer.is_group():
            yield from _iter_layers(layer, path)


# --- サブコマンド ------------------------------------------------------------

def cmd_data(args: argparse.Namespace) -> None:
    os.makedirs(args.out_dir, exist_ok=True)
    for path in _psd_files(args.target):
        name = os.path.splitext(os.path.basename(path))[0]
        psd = PSDImage.open(path)
        payload = {
            "file": os.path.basename(path),
            "width": psd.width,
            "height": psd.height,
            "layers": [_node(layer) for layer in psd],
        }
        out = os.path.join(args.out_dir, f"{name}.json")
        with open(out, "w", encoding="utf-8") as fh:
            json.dump(payload, fh, ensure_ascii=False, indent=1)
        print(f"{name}: {psd.width}x{psd.height} -> {out}")


def cmd_render(args: argparse.Namespace) -> None:
    os.makedirs(args.out_dir, exist_ok=True)
    for path in _psd_files(args.target):
        name = os.path.splitext(os.path.basename(path))[0]
        try:
            psd = PSDImage.open(path)
            image = psd.composite()
        except Exception as exc:  # noqa: BLE001
            print(f"{name}: 失敗 {type(exc).__name__}: {exc}", file=sys.stderr)
            continue
        image = image.convert("RGB")
        if args.width:
            w, h = image.size
            image = image.resize((args.width, max(1, round(h * args.width / w))))
        out = os.path.join(args.out_dir, f"{name}.png")
        image.save(out)
        print(f"{name}: {image.size[0]}x{image.size[1]} -> {out}")


def cmd_tree(args: argparse.Namespace) -> None:
    psd = PSDImage.open(args.target)
    print(f"# {os.path.basename(args.target)}  {psd.width}x{psd.height}")
    for path, layer in _iter_layers(psd):
        depth = path.count("/")
        if args.max_depth is not None and depth > args.max_depth:
            continue
        if args.filter and not fnmatch.fnmatch(path, args.filter):
            continue
        bbox = layer.bbox
        size = f"{bbox[2] - bbox[0]}x{bbox[3] - bbox[1]}"
        flag = "" if layer.visible else " [非表示]"
        text = ""
        if layer.kind == "type":
            text = '  "' + layer.text.strip().replace("\r", "/")[:30] + '"'
        print(f"{'  ' * depth}- [{layer.kind}] {layer.name}  {size} @{bbox[0]},{bbox[1]}{flag}{text}")


def _find_layer(psd: Any, pattern: str):
    matches = [(p, l) for p, l in _iter_layers(psd) if fnmatch.fnmatch(p, pattern) or p.endswith(pattern)]
    if not matches:
        raise SystemExit(f"レイヤーが見つかりません: {pattern}")
    if len(matches) > 1:
        exact = [m for m in matches if m[0] == pattern]
        if len(exact) == 1:
            return exact[0]
        listing = "\n".join(f"  {p}" for p, _ in matches[:10])
        raise SystemExit(f"パターンが複数のレイヤーに一致します:\n{listing}")
    return matches[0]


def _export_layer(
    psd: Any,
    pattern: str,
    out: str,
    quality: int,
    lossless: bool,
    exclude: list[str] | None = None,
    exclude_kinds: list[str] | None = None,
) -> None:
    """レイヤー/グループを 1 枚の画像として書き出す。

    exclude には対象グループからの相対パスを、exclude_kinds にはレイヤー種別を渡す。
    書き出しの間だけ非表示にする。テキストで実装する部分を焼き込まないために使う
    (代替フォントを使う以上、PSD の文字を画像として貼ることはできない。§6)。
    """
    path, layer = _find_layer(psd, pattern)

    hidden: list[Any] = []
    if exclude or exclude_kinds:
        for child_path, child in _iter_layers(layer, path):
            if not child.visible:
                continue
            rel = child_path[len(path) + 1:]
            by_path = exclude and any(fnmatch.fnmatch(rel, pat) or rel == pat for pat in exclude)
            by_kind = exclude_kinds and child.kind in exclude_kinds
            if by_path or by_kind:
                child.visible = False
                hidden.append(child)

    try:
        image = layer.composite()
    finally:
        for child in hidden:
            child.visible = True
    if image is None:
        raise SystemExit(f"書き出せませんでした(空のレイヤー): {path}")
    os.makedirs(os.path.dirname(os.path.abspath(out)) or ".", exist_ok=True)
    save_kwargs: dict[str, Any] = {}
    if out.lower().endswith(".webp"):
        save_kwargs = {"lossless": True} if lossless else {"quality": quality, "method": 6}
    image.save(out, **save_kwargs)
    print(f"{path}  {image.size[0]}x{image.size[1]} -> {out} ({os.path.getsize(out)} B)")


def cmd_export(args: argparse.Namespace) -> None:
    psd = PSDImage.open(args.target)
    _export_layer(
        psd, args.path, args.out, args.quality, args.lossless, args.exclude, args.exclude_kinds
    )


def _match_reference(image: Any, reference_path: str, box: tuple | None) -> Any:
    """自前合成の色を基準画像(Photoshop の合成)に合わせて線形補正する。

    背景として一致すべき画素(差が小さい画素)だけで回帰し、前景を消したことで
    大きく変わった画素は除外する。
    """
    import numpy as np
    from PIL import Image as PILImage

    reference = PILImage.open(reference_path).convert("RGB")
    if box:
        reference = reference.crop(box)
    if reference.size != image.size:
        reference = reference.resize(image.size, PILImage.LANCZOS)

    a = np.asarray(image, dtype=np.float64)
    b = np.asarray(reference, dtype=np.float64)
    # 前景を消した領域は大きく変わるため、差の小さい画素だけで係数を求める
    mask = np.abs(a - b).max(axis=2) < 40
    if mask.sum() < a[..., 0].size * 0.05:
        print("  補正をスキップ(一致する画素が少なすぎる)", file=sys.stderr)
        return image

    out = a.copy()
    for c in range(3):
        x = a[..., c][mask]
        y = b[..., c][mask]
        if x.std() < 1e-6:
            out[..., c] += y.mean() - x.mean()
            continue
        slope, intercept = np.polyfit(x, y, 1)
        out[..., c] = a[..., c] * slope + intercept

    # 背景は横方向のグラデーションが主なので、全体の線形補正だけでは
    # 端の色が 10 前後ずれて残る。列ごとの中央値でさらに詰める
    # (中央値なので、列の一部を文字が占めていても引きずられない)。
    diff = np.where(mask[..., None], b - out, np.nan)
    with np.errstate(invalid="ignore"):
        per_column = np.nanmedian(diff, axis=0)
    per_column = np.nan_to_num(per_column, nan=0.0)
    # 隣の列と平均して、1 列だけ極端な値になるのを避ける
    kernel = np.ones(15) / 15
    for c in range(3):
        padded = np.pad(per_column[:, c], 7, mode="edge")
        per_column[:, c] = np.convolve(padded, kernel, mode="valid")
    out += per_column[None, :, :]

    corrected = np.clip(out, 0, 255).astype(np.uint8)

    # 自前合成は Photoshop と完全には一致しない(とくにスクリーン合成の発光)。
    # 前景を消していない領域は基準画像(= Photoshop の合成そのもの)の画素を
    # そのまま使い、消した領域だけ自前合成で埋める。
    keep = np.abs(corrected.astype(np.float64) - b).max(axis=2) < 24
    # 文字の縁が残らないよう、置き換える側(= 消した領域)を少し広げる
    from scipy.ndimage import binary_erosion  # type: ignore
    keep = binary_erosion(keep, np.ones((7, 7)))
    corrected = np.where(keep[..., None], b.astype(np.uint8), corrected)
    residual = np.abs(corrected.astype(np.int16) - b.astype(np.int16))[mask].mean()
    print(f"  基準画像に合わせて色を補正した(残差 {residual:.2f} / 255)")
    return PILImage.fromarray(corrected)


def cmd_section_bg(args: argparse.Namespace) -> None:
    """前景だけを隠して文書全体を合成し、指定範囲を切り出す。

    グループ単体の composite では、そのグループより上に重なっているオーバーレイや
    調整レイヤーが反映されず、背景の色がカンプとずれる(実測で R チャンネルが
    10〜20 ずれた)。背景アセットはこちらで書き出すこと。
    """
    psd = PSDImage.open(args.target)
    patterns = args.hide or []
    kinds = set(args.hide_kinds or [])

    hidden = []
    for path, layer in _iter_layers(psd):
        if not layer.visible:
            continue
        by_path = any(fnmatch.fnmatch(path, pat) or path == pat for pat in patterns)
        if by_path or layer.kind in kinds:
            layer.visible = False
            hidden.append(layer)

    try:
        image = psd.composite().convert("RGB")
    finally:
        for layer in hidden:
            layer.visible = True

    box = None
    if args.box:
        x0, y0, x1, y1 = (int(v) for v in args.box.split(","))
        box = (x0, y0, min(x1, image.width), min(y1, image.height))
        image = image.crop(box)

    if args.match_reference:
        image = _match_reference(image, args.match_reference, box)

    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    save_kwargs = {"quality": args.quality, "method": 6} if args.out.lower().endswith(".webp") else {}
    image.save(args.out, **save_kwargs)
    print(f"{image.size[0]}x{image.size[1]} -> {args.out} ({os.path.getsize(args.out)} B)  隠したレイヤー {len(hidden)} 件")


def cmd_manifest(args: argparse.Namespace) -> None:
    """マニフェストに従って一括書き出しする。

    形式:
      {
        "psd_dir": "~/Downloads/260902_seitosama",
        "out_dir": "public/images/lp-2",
        "assets": [
          {"psd": "pc/pc1.psd", "path": "fv/medal/1", "out": "fv-medal-1.webp"},
          {"psd": "pc/pc1.psd", "path": "fv/medal/1", "out": "fv-medal-1.webp",
           "exclude": ["txt", "txt/**"]}
        ]
      }
    """
    with open(args.manifest, encoding="utf-8") as fh:
        manifest = json.load(fh)

    psd_dir = os.path.expanduser(manifest["psd_dir"])
    out_dir = manifest["out_dir"]
    cache: dict[str, Any] = {}
    ok = failed = 0

    for asset in manifest["assets"]:
        psd_path = os.path.join(psd_dir, asset["psd"])
        if psd_path not in cache:
            cache[psd_path] = PSDImage.open(psd_path)
        try:
            _export_layer(
                cache[psd_path],
                asset["path"],
                os.path.join(out_dir, asset["out"]),
                asset.get("quality", args.quality),
                asset.get("lossless", False),
                asset.get("exclude"),
                asset.get("exclude_kinds"),
            )
            ok += 1
        except SystemExit as exc:
            print(f"  失敗: {asset['out']}: {exc}", file=sys.stderr)
            failed += 1

    print(f"\n書き出し {ok} 件 / 失敗 {failed} 件")
    if failed:
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("data", help="レイヤーツリーを JSON 化する")
    p.add_argument("target", help="PSD ファイル or ディレクトリ")
    p.add_argument("--out-dir", required=True)
    p.set_defaults(func=cmd_data)

    p = sub.add_parser("render", help="合成して PNG に書き出す")
    p.add_argument("target", help="PSD ファイル or ディレクトリ")
    p.add_argument("--out-dir", required=True)
    p.add_argument("--width", type=int, help="指定幅にリサイズする(既定: 原寸)")
    p.set_defaults(func=cmd_render)

    p = sub.add_parser("tree", help="レイヤーツリーを表示する")
    p.add_argument("target", help="PSD ファイル")
    p.add_argument("--filter", help="パスの glob パターンで絞り込む")
    p.add_argument("--max-depth", type=int)
    p.set_defaults(func=cmd_tree)

    p = sub.add_parser("export", help="レイヤー/グループを画像に書き出す")
    p.add_argument("target", help="PSD ファイル")
    p.add_argument("--path", required=True, help="レイヤーパス(glob 可)")
    p.add_argument("--out", required=True)
    p.add_argument("--quality", type=int, default=80)
    p.add_argument("--lossless", action="store_true", help="図版・ロゴ向けの可逆圧縮")
    p.add_argument(
        "--exclude",
        action="append",
        help="書き出しから除外する子レイヤーの相対パス(glob 可)。複数指定可",
    )
    p.add_argument(
        "--exclude-kinds",
        action="append",
        help="書き出しから除外するレイヤー種別(例: type)。複数指定可",
    )
    p.set_defaults(func=cmd_export)

    p = sub.add_parser(
        "section-bg",
        help="前景を隠して文書全体を合成し、範囲を切り出す(背景アセット向け)",
    )
    p.add_argument("target", help="PSD ファイル")
    p.add_argument("--hide", action="append", help="隠すレイヤーパス(glob 可)。複数指定可")
    p.add_argument(
        "--hide-kinds",
        action="append",
        help="隠すレイヤー種別(例: type)。文字を実テキストで実装する場合に指定する",
    )
    p.add_argument("--box", help="切り出す範囲 x0,y0,x1,y1")
    p.add_argument(
        "--match-reference",
        help="基準画像(render で書き出した PNG)に色を合わせる",
    )
    p.add_argument("--out", required=True)
    p.add_argument("--quality", type=int, default=80)
    p.set_defaults(func=cmd_section_bg)

    p = sub.add_parser("manifest", help="マニフェストに従って一括書き出しする")
    p.add_argument("manifest")
    p.add_argument("--quality", type=int, default=80)
    p.set_defaults(func=cmd_manifest)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
