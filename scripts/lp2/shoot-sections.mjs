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
// element.screenshot() は、要素の高さがビューポート高をわずかに下回るときに
// 下端が白く抜けることがある(PRICING の下 42px が白落ちしていた)。
// 一番高いセクションより十分に高くしておく。
const VIEWPORT_HEIGHT = side === 'sp' ? 2600 : 2600;
const SECTIONS = [
  'fv', 'about', 'result', 'instructor', 'strength', 'difference',
  'step', 'skill', 'support', 'plan', 'graph', 'voice', 'faq', 'present', 'counselling',
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
// SP のカンプは @2x(750px)なので、同じ解像度で撮って等倍で比べる。
// 375px で撮って引き伸ばすと、拡大のぼけぶんだけ一致率が下がる。
const page = await browser.newPage({
  viewport: { width, height: VIEWPORT_HEIGHT },
  deviceScaleFactor: side === 'sp' ? 2 : 1,
});
// Cookie バナーが撮影に写り込まないよう同意済みにしておく
await page.addInitScript(() => {
  try { localStorage.setItem('lp2-cookie-consent', 'accepted'); } catch {}
});

await page.goto(url, { waitUntil: 'networkidle' });

// 開発サーバーのインジケーター(左下の丸い N)が写り込むと、
// そのぶんが毎回不一致として数えられてしまう
await page
  .addStyleTag({ content: 'nextjs-portal, #__next-build-watcher { display: none !important; }' })
  .catch(() => {});
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

// 日本語 Web フォントは preload していないため、適用されるまで待つ。
// 待たずに撮ると代替フォントのまま写り、カンプとの一致率が落ちる。
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

// 外部の予約ウィジェット(Jicoo)は遅延読み込みなので、描画されるまで待つ。
await page.waitForTimeout(2500);

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
