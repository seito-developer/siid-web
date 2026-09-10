import sharp from 'sharp';

// SPカンプのイラスト部分のみ分離。本文・カード背景は可変高のHTMLで描画する。
const tops = [497, 1305, 2145, 3036, 3814];
await Promise.all(tops.map((top, index) => sharp('public/images/lp-career/sp/step.webp')
  .extract({ left: 34, top, width: 682, height: 280 })
  .webp({ quality: 90 })
  .toFile(`public/images/lp-career/sp/step-visual-${index + 1}.webp`)));
