#!/usr/bin/env python3
"""カンプと実装で「インク(文字・罫線)の位置」がずれていないかを測る。

check-design.sh の画素一致率は、背景が面積の大半を占めるセクションでは
文字が大きくずれても数値が落ちない(STRENGTH が崩れたまま 91% で合格していた)。
この指標は「実装側のインクが、カンプの同じ位置の近傍にインクを持つか」だけを見るため、
位置ずれを直接検出できる。

  python3 scripts/lp-career/ink-check.py pc
  python3 scripts/lp-career/ink-check.py sp
"""
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import maximum_filter, uniform_filter

Image.MAX_IMAGE_PIXELS = None

PC = [('fv','pc1',0,781),('about','pc1',781,1237),('result','pc1',1237,2017),
      ('instructor','pc2',0,901),('strength','pc2',901,1942),('difference','pc2',1942,3303),
      ('step','pc3',0,2242),('skill','pc4',0,1700),('support','pc4',1700,2515),
      ('plan','pc5',0,865),('graph','pc5',865,2239),('voice','pc6',0,1730),
      ('faq','pc8',0,1256),('present','pc7',0,1083),('counselling','pc9',0,1019)]
SP = [('fv','seitosama_lp_sp01',0,1473),('about','seitosama_lp_sp01',1473,2033),
      ('result','seitosama_lp_sp01',2033,3102),('instructor','seitosama_lp_sp01',3102,4735),
      ('strength','seitosama_lp_sp01',4735,7857),('difference','seitosama_lp_sp02',0,2978),
      ('step','seitosama_lp_sp03',0,4620),('skill','seitosama_lp_sp04',0,2202),
      ('support','seitosama_lp_sp05',0,1646),('plan','seitosama_lp_sp06',0,1525),
      ('graph','seitosama_lp_sp07',0,1725),('voice','seitosama_lp_sp08',0,3872),
      ('faq','seitosama_lp_sp09',0,1923),('present','seitosama_lp_sp10',0,3176),
      ('counselling','seitosama_lp_sp11',0,2374)]
# FV は動画領域が別カットのため判定から外す(check-design.sh と同じ)
IGNORE = {('pc','fv'): (83, 617), ('sp','fv'): (84, 1180)}

def ink(img):
    """局所平均から外れた画素をインクとみなす(背景の明暗に依らない)"""
    g = np.asarray(img.convert('L'), np.float32)
    local = uniform_filter(g, size=25)
    return np.abs(g - local) > 18

def score(ref_img, act_img, ignore=None):
    a, b = ink(ref_img), ink(act_img)
    if ignore:
        y0, y1 = ignore
        a[y0:y1] = False
        b[y0:y1] = False
    grow_a = maximum_filter(a, size=17)   # ±8px
    grow_b = maximum_filter(b, size=17)
    if b.sum() == 0 or a.sum() == 0:
        return 0.0, 0.0
    # 実装のインクがカンプ近傍にある割合 / カンプのインクが実装近傍にある割合
    return (b & grow_a).sum() / b.sum() * 100, (a & grow_b).sum() / a.sum() * 100

side = sys.argv[1] if len(sys.argv) > 1 else 'pc'
rows = PC if side == 'pc' else SP
w = 1440 if side == 'pc' else 750
page = Image.open(f'tmp/review/base/page-{1440 if side=="pc" else 375}.png').convert('RGB')
if page.width != w:
    page = page.resize((w, round(page.height * w / page.width)), Image.LANCZOS)

print(f'{"セクション":<14}{"実装→カンプ":>12}{"カンプ→実装":>12}  判定')
print('-' * 52)
off = 0
worst = []
for name, psd, y0, y1 in rows:
    ref = Image.open(f'tmp/psd-ref/{side}/{psd}.png').convert('RGB').crop((0, y0, w, y1))
    act = page.crop((0, off, w, min(off + (y1 - y0), page.height)))
    off += y1 - y0
    if act.height != ref.height:
        pad = Image.new('RGB', (w, ref.height), (255, 0, 255))
        pad.paste(act, (0, 0)); act = pad
    p, r = score(ref, act, IGNORE.get((side, name)))
    ng = p < 90 or r < 90
    if ng: worst.append((min(p, r), name))
    print(f'{name:<14}{p:>11.1f}%{r:>11.1f}%  {"← 要確認" if ng else "ok"}')
print()
if worst:
    print('確認すべき順:', ' → '.join(n for _, n in sorted(worst)))
