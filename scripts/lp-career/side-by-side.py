#!/usr/bin/env python3
"""カンプと実装を並べた比較画像を作る(目視確認用)。

  python3 scripts/lp-career/side-by-side.py instructor --side pc --ref pc2 --crop 0:979
"""
import argparse, os
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("name")
ap.add_argument("--side", default="pc")
ap.add_argument("--ref", required=True)
ap.add_argument("--crop", required=True)
ap.add_argument("--width", type=int, default=460)
ap.add_argument("--out")
a = ap.parse_args()

top, _, bottom = a.crop.partition(":")
ref = Image.open(f"tmp/psd-ref/{a.side}/{a.ref}.png").convert("RGB")
ref = ref.crop((0, int(top), ref.width, min(int(bottom), ref.height)))
act = Image.open(f"tmp/shots/{a.side}/{a.name}.png").convert("RGB")

fit = lambda im: im.resize((a.width, max(1, round(im.height * a.width / im.width))))
r, c = fit(ref), fit(act)
out = Image.new("RGB", (a.width * 2 + 12, max(r.height, c.height)), (255, 0, 0))
out.paste(r, (0, 0))
out.paste(c, (a.width + 12, 0))
path = a.out or f"tmp/diff/{a.side}-{a.name}-side.png"
os.makedirs(os.path.dirname(path), exist_ok=True)
out.save(path)
print(f"{path}  (左:カンプ 右:実装)  {out.size}")
