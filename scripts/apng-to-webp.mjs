// APNG をアニメーション WebP に変換する（Issue #94）。
//
//   node scripts/apng-to-webp.mjs <入力.png> <出力.webp> [--size 540] [--quality 75] [--frame-step 2]
//
// --frame-step N でフレームを N 枚に 1 枚へ間引く(間引いた分の表示時間は残すフレームに加算するため、
// 再生時間は変わらない)。ファイルサイズはフレーム数にほぼ比例するため、これが最も効く。
//
// ffmpeg にアニメーション WebP のエンコーダが無い環境があるため、
// ffmpeg でフレームを展開し、libwebp の img2webp で組み立てる。
// APNG のフレームごとの表示時間（fcTL チャンクの delay_num/delay_den）を読み取り、
// 同じ間隔で WebP に引き継ぐ。
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** APNG の fcTL チャンクから、フレームごとの表示時間(ミリ秒)を取り出す。 */
function readFrameDelays(file) {
  const buf = fs.readFileSync(file);
  const delays = [];
  let pos = 8; // PNG シグネチャの後ろから
  while (pos + 8 <= buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'fcTL') {
      const data = pos + 8;
      const num = buf.readUInt16BE(data + 20);
      const den = buf.readUInt16BE(data + 22) || 100; // 仕様上 0 は 100 と解釈する
      delays.push(Math.max(10, Math.round((num / den) * 1000)));
    }
    pos += 12 + length; // length + type(4) + data + crc(4)
    if (type === 'IEND') { break; }
  }
  return delays;
}

function main() {
  const [input, output] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const arg = (name, fallback) => {
    const i = process.argv.indexOf(`--${name}`);
    return i === -1 ? fallback : process.argv[i + 1];
  };
  if (!input || !output) {
    console.error('使い方: node scripts/apng-to-webp.mjs <入力.png> <出力.webp> [--size 540] [--quality 75]');
    process.exit(1);
  }
  const size = Number(arg('size', 540));
  const quality = Number(arg('quality', 75));
  const frameStep = Math.max(1, Number(arg('frame-step', 1)));

  const delays = readFrameDelays(input);
  if (delays.length === 0) {
    console.error(`${input} はアニメーション APNG ではない（fcTL が無い）`);
    process.exit(1);
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'apng2webp-'));
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', input,
      '-vf', `scale=${size}:${size}:flags=lanczos`, '-fps_mode', 'passthrough',
      path.join(tmp, 'f_%05d.png')]);

    const frames = fs.readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();
    if (frames.length !== delays.length) {
      console.warn(`  警告: フレーム数が一致しない(展開 ${frames.length} / fcTL ${delays.length})。少ないほうに合わせる`);
    }

    // 間引く場合、捨てるフレームの表示時間を直前の残すフレームへ足し込む
    const kept = [];
    frames.forEach((f, i) => {
      const delay = delays[i] ?? delays[delays.length - 1];
      if (i % frameStep === 0) {
        kept.push({ file: f, delay });
      } else if (kept.length > 0) {
        kept[kept.length - 1].delay += delay;
      }
    });

    const args = ['-loop', '0', '-lossy', '-q', String(quality)];
    kept.forEach(({ file, delay }) => {
      args.push('-d', String(delay), path.join(tmp, file));
    });
    args.push('-o', output);
    execFileSync('img2webp', args);

    const before = fs.statSync(input).size / 1024;
    const after = fs.statSync(output).size / 1024;
    console.log(`${path.basename(input)} → ${path.basename(output)}  `
      + `${before.toFixed(0)}KB → ${after.toFixed(0)}KB (${(100 - (after / before) * 100).toFixed(0)}% 削減) `
      + `/ ${kept.length} フレーム(元 ${frames.length}) / ${size}px`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

main();
