#!/usr/bin/env python3
"""PSD からセクション別の実測データを Markdown として生成する。

実装エージェントが PSD を開かずに座標・サイズ・テキスト全文・スタイルを参照できる
ようにするためのもの(docs/spec/07_lp-career-renewal.md §3)。

  python3 scripts/lp-career/gen-section-docs.py ~/Downloads/260902_seitosama \\
      --out-dir docs/spec/lp-career-sections

出力: docs/spec/lp-career-sections/NN-<slug>.md (DOM 順に採番)

PSD 本体はリポジトリに含めないため、生成物のほうをコミットして参照可能にする。
"""

from __future__ import annotations

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from psd_tool import _iter_layers, _type_info  # noqa: E402

try:
    from psd_tools import PSDImage
except ImportError:  # pragma: no cover
    sys.exit("psd-tools が必要です: pip install -r scripts/lp-career/requirements.txt")


# DOM 順(§3.1 の決定に従い FAQ → FREE GIFTS)。
# (連番, スラッグ, 表示名, PC の (ファイル, グループ名), SP の (ファイル, グループ名))
SECTIONS = [
    ("header", "ヘッダー(固定ナビ)", ("pc1", "fv/header"), ("seitosama_lp_sp01", "fv/header")),
    ("fv", "FV(動画背景)", ("pc1", "fv"), ("seitosama_lp_sp01", "fv")),
    ("about", "ABOUT", ("pc1", "sec_about"), ("seitosama_lp_sp01", "sec_about")),
    ("result", "RESULTS(カルーセル)", ("pc1", "sec_result"), ("seitosama_lp_sp01", "sec_result")),
    ("instructor", "INSTRUCTOR", ("pc2", "sec_instructor"), ("seitosama_lp_sp01", "sec_instructor")),
    ("strength", "STRENGTH", ("pc2", "sec_strength"), ("seitosama_lp_sp01", "sec_strength")),
    ("difference", "DIFFERENCE(他社比較)", ("pc2", "sec_difference"), ("seitosama_lp_sp02", "sec_comparison")),
    ("step", "内定までの 5STEP", ("pc3", "sec_step"), ("seitosama_lp_sp03", None)),
    ("skill", "SKILLS(カリキュラム)", ("pc4", "sec_skill"), ("seitosama_lp_sp04", "sec_skill")),
    ("support", "RESKILLING SUPPORT(給付金)", ("pc4", "sec_support"), ("seitosama_lp_sp05", None)),
    ("plan", "PRICING(料金プラン)", ("pc5", "sec_plan"), ("seitosama_lp_sp06", "sec_plan")),
    ("graph", "コース比較表", ("pc5", "sec_graph"), ("seitosama_lp_sp07", "sec_graph")),
    ("voice", "VOICE(受講生の声)", ("pc6", "sec_voice"), ("seitosama_lp_sp08", "sec_voice")),
    ("faq", "FAQ", ("pc8", None), ("seitosama_lp_sp09", None)),
    ("present", "FREE GIFTS(7 大特典)", ("pc7", "sec_present"), ("seitosama_lp_sp10", None)),
    ("counselling", "FREE COUNSELING(予約フォーム)", ("pc9", "sec_counselling"), ("seitosama_lp_sp11", None)),
    ("drawer", "SP ドロワーメニュー", (None, None), ("seitosama_lp_sp12_menu", None)),
]

MAX_LINES = 400  # 1 セクションあたりの行数上限。巨大なセクションで文書が破綻するのを防ぐ。


def _open(psd_dir: str, group: str, name: str):
    for ext in (".psd", ".psb"):
        path = os.path.join(psd_dir, group, name + ext)
        if os.path.exists(path):
            return PSDImage.open(path), path
    return None, None


def _render_tree(psd, root_name: str | None, lines: list[str]) -> None:
    """root_name 配下(None なら全体)のレイヤーを Markdown のリストとして書き出す。"""
    count = 0
    base_depth = 0
    inside = root_name is None

    for path, layer in _iter_layers(psd):
        if root_name is not None:
            if path == root_name:
                inside = True
                base_depth = path.count("/")
            elif inside and not path.startswith(root_name + "/"):
                # ルートを抜けたら終了。ただし同名グループの複製が続く場合があるため継続する。
                inside = False
                continue
        if not inside:
            continue
        if not layer.visible:
            continue

        count += 1
        if count > MAX_LINES:
            lines.append("")
            lines.append(f"> 行数上限({MAX_LINES})に達したため以降を省略。詳細は `psd_tool.py tree` で確認すること。")
            return

        depth = max(0, path.count("/") - base_depth)
        bbox = layer.bbox
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        indent = "  " * depth
        head = f"{indent}- **{layer.name}** `{layer.kind}` — {w}×{h} @ ({bbox[0]}, {bbox[1]})"

        if layer.kind == "type":
            info = _type_info(layer)
            if "error" not in info:
                text = (info.get("text") or "").strip().replace("\r", " ⏎ ")
                head += (
                    f"\n{indent}  - テキスト: 「{text}」"
                    f"\n{indent}  - {info.get('font')} / {info.get('font_size_px')}px"
                    f" / 行間 {info.get('line_height_px')}px"
                    f" / 字送り {info.get('letter_spacing_em')}em"
                    f" / {info.get('color')}"
                )
        lines.append(head)


def build(psd_dir: str, out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    index: list[str] = []

    for order, (slug, title, pc, sp) in enumerate(SECTIONS, start=1):
        lines = [f"# {order:02d}. {title}", ""]
        lines.append("> `scripts/lp-career/gen-section-docs.py` による自動生成。手で編集しないこと。")
        notes_name = f"{order:02d}-{slug}.notes.md"
        if os.path.exists(os.path.join(out_dir, notes_name)):
            lines.append(">")
            lines.append(f"> **補足あり**: 平坦化されていて自動抽出できない内容を [`{notes_name}`](./{notes_name}) に手書きで残している。")
        lines.append("")

        for label, spec, group_dir in (("PC", pc, "pc"), ("SP", sp, "sp")):
            file_name, root = spec
            if not file_name:
                lines += [f"## {label}", "", "該当なし。", ""]
                continue

            psd, path = _open(psd_dir, group_dir, file_name)
            if psd is None:
                lines += [f"## {label}", "", f"PSD が見つかりません: {group_dir}/{file_name}", ""]
                continue

            lines += [
                f"## {label} — `{os.path.basename(path)}`",
                "",
                f"キャンバス: **{psd.width} × {psd.height}px**"
                + ("(@2x = CSS %dpx 幅)" % (psd.width // 2) if label == "SP" else ""),
                "",
                f"対象グループ: `{root or 'ファイル全体'}`",
                "",
            ]
            _render_tree(psd, root, lines)
            lines.append("")

        out_path = os.path.join(out_dir, f"{order:02d}-{slug}.md")
        with open(out_path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines).rstrip() + "\n")
        print(f"{order:02d}-{slug}.md  ({os.path.getsize(out_path) // 1024}KB)")
        notes_name = f"{order:02d}-{slug}.notes.md"
        note = f"[補足](./{notes_name})" if os.path.exists(os.path.join(out_dir, notes_name)) else ""
        index.append(f"| {order:02d} | [{title}](./{order:02d}-{slug}.md) | `{slug}` | {note} |")

    readme = [
        "# LP リニューアル セクション別実測データ",
        "",
        "PSD から自動生成したセクションごとの座標・サイズ・テキスト全文・スタイル。",
        "実装時はここを参照し、PSD を直接開かなくても済むようにする。",
        "",
        "生成: `python3 scripts/lp-career/gen-section-docs.py <PSD ディレクトリ> --out-dir docs/spec/lp-career-sections`",
        "",
        "並び順は DOM 順(`docs/spec/07_lp-career-renewal.md` §3.1 の決定に従い FAQ → FREE GIFTS)。",
        "",
        "| # | セクション | コンポーネント | 補足 |",
        "|---|-----------|--------------|------|",
        *index,
    ]
    with open(os.path.join(out_dir, "README.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(readme) + "\n")
    print("README.md")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("psd_dir", help="入稿データのルート(pc/ と sp/ を含む)")
    parser.add_argument("--out-dir", default="docs/spec/lp-career-sections")
    args = parser.parse_args()
    build(os.path.expanduser(args.psd_dir), args.out_dir)


if __name__ == "__main__":
    main()
