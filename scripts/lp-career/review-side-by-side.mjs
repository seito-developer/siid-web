// 通し画像とカンプをセクション単位で左右に並べた画像を作る(目視レビュー用)。
//
//   node scripts/lp-career/review-side-by-side.mjs pc tmp/review/base
//
// 左 = カンプ、右 = 実装。両者は同じ表示幅に揃えてから並べる。
import fs from 'node:fs';
import path from 'node:path';

import sharp from 'sharp';

const side = process.argv[2] ?? 'pc';
const dir = process.argv[3] ?? 'tmp/review/base';
const outDir = path.join(dir, `sbs-${side}`);
fs.mkdirSync(outDir, { recursive: true });

// カンプ側の切り出し範囲(PSD 座標)。check-design.sh の ROWS と同じ。
const PC = [
  ['fv', 'pc1', 0, 781], ['about', 'pc1', 781, 1237], ['result', 'pc1', 1237, 2017],
  ['instructor', 'pc2', 0, 901], ['strength', 'pc2', 901, 1942], ['difference', 'pc2', 1942, 3303],
  ['step', 'pc3', 0, 2242], ['skill', 'pc4', 0, 1700], ['support', 'pc4', 1700, 2515],
  ['plan', 'pc5', 0, 865], ['graph', 'pc5', 865, 2239], ['voice', 'pc6', 0, 1730],
  ['faq', 'pc8', 0, 1256], ['present', 'pc7', 0, 1083], ['counselling', 'pc9', 0, 1019],
];
const SP = [
  ['fv', 'seitosama_lp_sp01', 0, 1473], ['about', 'seitosama_lp_sp01', 1473, 2033],
  ['result', 'seitosama_lp_sp01', 2033, 3102], ['instructor', 'seitosama_lp_sp01', 3102, 4735],
  ['strength', 'seitosama_lp_sp01', 4735, 7857], ['difference', 'seitosama_lp_sp02', 0, 2978],
  ['step', 'seitosama_lp_sp03', 0, 4620], ['skill', 'seitosama_lp_sp04', 0, 2202],
  ['support', 'seitosama_lp_sp05', 0, 1646], ['plan', 'seitosama_lp_sp06', 0, 1525],
  ['graph', 'seitosama_lp_sp07', 0, 1725], ['voice', 'seitosama_lp_sp08', 0, 3872],
  ['faq', 'seitosama_lp_sp09', 0, 1923], ['present', 'seitosama_lp_sp10', 0, 3176],
  ['counselling', 'seitosama_lp_sp11', 0, 2374],
];

const rows = side === 'pc' ? PC : SP;
const width = side === 'pc' ? 1440 : 375;
const shotPath = path.join(dir, `page-${width}.png`);
const rects = JSON.parse(fs.readFileSync(path.join(dir, `sections-${width}.json`), 'utf8')).sections;
const shot = sharp(shotPath);
const shotMeta = await shot.metadata();

const COL = side === 'pc' ? 620 : 340; // 並べたときの 1 カラム幅

for (const [name, ref, top, bottom] of rows) {
  const r = rects[name];
  if (!r) { console.log(`${name}: DOM に無い`); continue; }

  const refFile = `tmp/psd-ref/${side}/${ref}.png`;
  const refMeta = await sharp(refFile).metadata();
  const refBuf = await sharp(refFile)
    .extract({ left: 0, top, width: refMeta.width, height: Math.min(bottom, refMeta.height) - top })
    .resize({ width: COL })
    .toBuffer();

  const actBuf = await sharp(shotPath)
    .extract({
      left: 0,
      top: Math.max(0, r.top),
      width: shotMeta.width,
      height: Math.min(r.height, shotMeta.height - Math.max(0, r.top)),
    })
    .resize({ width: COL })
    .toBuffer();

  const a = await sharp(refBuf).metadata();
  const c = await sharp(actBuf).metadata();
  const H = Math.max(a.height, c.height);
  await sharp({ create: { width: COL * 2 + 16, height: H, channels: 3, background: { r: 255, g: 0, b: 0 } } })
    .composite([{ input: refBuf, left: 0, top: 0 }, { input: actBuf, left: COL + 16, top: 0 }])
    .png()
    .toFile(path.join(outDir, `${name}.png`));
  console.log(`${outDir}/${name}.png  カンプ ${a.height}px / 実装 ${c.height}px`);
}
