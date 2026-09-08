// ページ全体を 1 枚で撮る(デザイン判定用)。
//
//   node scripts/lp2/shoot-fullpage.mjs 1440
//   node scripts/lp2/shoot-fullpage.mjs 375
//
// check-design.sh はセクションを 1 枚ずつ切り出して比較するため、
// セクションをまたぐ崩れ・ヘッダーの被り・要素の重なりを検出できない。
// レビューでは必ずこちらの通し画像も見ること。
// 出力先は環境変数 SPDIR(既定は tmp/shots)。
import { chromium } from 'playwright';

const b = await chromium.launch();
const w = Number(process.argv[2] ?? 1440);
const p = await b.newPage({ viewport: { width: w, height: 1000 } });
// ヘッダーは消さない。実画面での被りを見るため
await p.addInitScript(() => { try { localStorage.setItem('lp2-cookie-consent', 'accepted'); } catch {} });
await p.goto('http://localhost:3001/siid/lp-2', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
// 段階スクロールで遅延読み込みを起こす
const h0 = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h0; y += 900) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(120); }
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(2500);
// 動画は再生されているとフレームが毎回変わるので止める。
// 画面内に入ると再生を再開する実装(FvVideo.tsx)があるため、監視ごと外す。
await p.evaluate(() => {
  document.querySelectorAll('video').forEach((v) => {
    v.pause();
    v.currentTime = 0;
    v.removeAttribute('autoplay');
    v.addEventListener('play', () => v.pause());
  });
});
// 遅延読み込みの画像が読み終わるまで待つ。待たないと背景が抜けた絵で
// 判定してしまう(SP の背景が丸ごと落ちて 4/15 になった)。
await p.evaluate(async () => {
  await Promise.all(
    [...document.images].map((img) => {
      if (img.complete && img.naturalWidth > 0) return null;
      return Promise.race([
        new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        }),
        new Promise((resolve) => setTimeout(resolve, 20000)),
      ]);
    }),
  );
});
await p.waitForTimeout(500);
const info = await p.evaluate(() => ({
  h: document.body.scrollHeight,
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth,
}));
console.log('高さ', info.h, '/ scrollWidth', info.sw, '/ clientWidth', info.cw, info.sw > info.cw ? '← 横スクロールあり' : '');
await p.screenshot({ path: `${process.env.SPDIR ?? 'tmp/shots'}/page-${w}.png`, fullPage: true });
await b.close();
console.log('done');
