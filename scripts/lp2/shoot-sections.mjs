// 実装のセクションを 1 枚ずつ撮影する(デザイン差分判定用)。
//
//   node scripts/lp2/shoot-sections.mjs pc
//   node scripts/lp2/shoot-sections.mjs sp
//
// 撮影幅は完了条件どおり PC 1440px / SP 375px(docs/spec/07_lp2-renewal.md §13)。
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const side = process.argv[2] === 'sp' ? 'sp' : 'pc';
const width = side === 'sp' ? 375 : 1440;
const url = process.env.LP2_URL ?? 'http://localhost:3000/siid/lp-2';
const outDir = `tmp/shots/${side}`;
const SECTIONS = [
  'fv', 'about', 'result', 'instructor', 'strength', 'difference',
  'step', 'skill', 'support', 'plan', 'graph', 'voice', 'faq', 'present', 'counselling',
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
// Cookie バナーが撮影に写り込まないよう同意済みにしておく
await page.addInitScript(() => {
  try { localStorage.setItem('lp2-cookie-consent', 'accepted'); } catch {}
});
await page.goto(url, { waitUntil: 'networkidle' });
// 遅延読み込みの画像を確実に読ませる
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, y);
      y += 600;
      if (y < document.body.scrollHeight) setTimeout(step, 24);
      else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
    };
    step();
  });
});

// 動画は再生されているとフレームが毎回変わり、基準画像と比較できない。
// 先頭で止めてポスターと同じ絵にそろえる。
await page.evaluate(async () => {
  const videos = [...document.querySelectorAll('video')];
  for (const v of videos) {
    v.pause();
    v.currentTime = 0;
  }
  await new Promise((r) => setTimeout(r, 300));
});

for (const id of SECTIONS) {
  const el = page.locator(`#${id}`);
  if (await el.count() === 0) continue;
  // 固定ヘッダーは FV のカンプにだけ含まれる。他のセクションでは写り込みを避けて隠す
  await page.evaluate((sectionId) => {
    const header = document.querySelector('header');
    if (header) header.style.visibility = sectionId === 'fv' ? 'visible' : 'hidden';
  }, id);
  await el.screenshot({ path: `${outDir}/${id}.png` });
  const box = await el.boundingBox();
  console.log(`${id.padEnd(12)} ${Math.round(box.width)}x${Math.round(box.height)}`);
}

await browser.close();
