#!/usr/bin/env python3
"""セクション実測データ(Markdown)を実装しやすい形に要約する。

  python3 scripts/lp-career/summarize-section.py 05-instructor --side PC [--origin 0]

--origin にセクションの PSD 上の開始 y を渡すと、その相対座標で表示する。
SP は @2x のため CSS px(半分)に換算して表示する。
"""
import argparse, os, re, sys

DOC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "docs", "spec", "lp-career-sections")

PATTERN = re.compile(
    r"^(\s*)- \*\*(.+?)\*\* `(\w+)` — (\d+)×(\d+) @ \((-?\d+), (-?\d+)\)"
    r"(?:\n\s*- テキスト: 「(.*?)」\n\s*- (.*?)$)?",
    re.M | re.S,
)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("section")
    ap.add_argument("--side", choices=["PC", "SP"], default="PC")
    ap.add_argument("--origin", type=int, default=0)
    ap.add_argument("--kinds", default="type,shape,pixel,smartobject")
    args = ap.parse_args()

    path = None
    for name in os.listdir(DOC_DIR):
        if name.startswith(args.section) and name.endswith(".md") and ".notes" not in name:
            path = os.path.join(DOC_DIR, name)
            break
    if not path:
        sys.exit(f"見つかりません: {args.section}")

    text = open(path, encoding="utf-8").read()
    parts = text.split("## SP")
    body = parts[0] if args.side == "PC" else ("## SP" + parts[1] if len(parts) > 1 else "")
    scale = 2 if args.side == "SP" else 1
    kinds = set(args.kinds.split(","))

    print(f"# {os.path.basename(path)}  [{args.side}]"
          + (f"  原点 y={args.origin}" if args.origin else "")
          + ("  ※SP は CSS px に換算" if scale == 2 else ""))

    for m in PATTERN.finditer(body):
        indent, name, kind, w, h, x, y, txt, style = m.groups()
        if kind not in kinds:
            continue
        depth = len(indent) // 2
        cx, cy = int(x) / scale, (int(y) - args.origin) / scale
        cw, ch = int(w) / scale, int(h) / scale
        head = f"{'  ' * depth}{kind[:4]:<5} {cw:>6.0f}x{ch:<5.0f} @({cx:>6.0f},{cy:>6.0f})"
        if kind == "type" and txt is not None:
            info = style.strip().replace("行間 ", "lh").replace("字送り ", "ls").replace(" / ", " ")
            info = re.sub(r"([\d.]+)px", lambda mm: f"{float(mm.group(1))/scale:.1f}px", info, count=1)
            info = re.sub(r"lh([\d.]+)px", lambda mm: f"lh{float(mm.group(1))/scale:.1f}", info)
            print(f"{head}  「{txt.strip()[:30]}」")
            print(f"{'  ' * depth}      {info}")
        else:
            print(f"{head}  {name[:34]}")

if __name__ == "__main__":
    main()
