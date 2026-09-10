// PSDのスマートオブジェクトに残る旧文字の影を除去する。
// 縁と矢印は残し、文字領域のみ同じ行の無地の緑で補間する。
// export-bg.sh pc-cta-button の後に実行する。
import sharp from 'sharp';
const file = 'public/images/lp-career/cta-button-pc.webp';
const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 10; y < info.height - 12; y++) {
  for (let x = 72; x < 436; x++) {
    for (let c = 0; c < 4; c++) data[(y * info.width + x) * 4 + c] = data[(y * info.width + 25) * 4 + c];
  }
}
const image = await sharp(data, { raw: info }).webp({ quality: 95 }).toBuffer();
await import('node:fs/promises').then(fs => fs.writeFile(file, image));
