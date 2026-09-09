"""料金カード用CTA。文字を隠して書き出し、元カンプの枠・矢印と色調を保持する。"""
import os
from pathlib import Path
import numpy as np
from PIL import Image
from psd_tools import PSDImage

source = Path(os.environ.get('LP2_PSD_DIR', str(Path.home() / 'Downloads/260902_seitosama')))
psd = PSDImage.open(source / 'pc/pc5.psd')
from psd_tool import _find_layer
_, button = _find_layer(psd, 'sec_plan/xxx/Career + FullSupport/btn')
_, text = _find_layer(button, 'グループ 8/グループ 7')
text.visible = False
# グループの原点(567,594)から緑のボタン(569,651)だけを取り出す。
clean = np.asarray(button.composite().convert('RGB').crop((2, 57, 311, 131)), dtype=float)
reference = Image.open('tmp/psd-ref/pc/pc5.png').convert('RGB').crop((569, 651, 878, 725))
result = np.asarray(reference).copy()
# 文字が存在しない左端の緑から各行の色調差を取得する。
# 行全体を単色で塗りつぶさず、元レイヤーの横方向の濃淡・質感を残す。
for y in range(6, 66):
    correction = np.median(result[y, 12:20].astype(float) - clean[y, 12:20], axis=0)
    result[y, 43:265] = np.clip(clean[y, 43:265] + correction, 0, 255).astype('uint8')
Image.fromarray(result).save('public/images/lp-2/plan-cta.png')
