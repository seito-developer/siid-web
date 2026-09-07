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

// 日本語フォントは unicode-range で分割配信され、preload も切ってあるため
// `document.fonts.ready` だけでは取りこぼす。ページ上の文字を渡して
// 必要なチャンクを明示的に読み込ませる(取りこぼすと代替フォントで撮れてしまう)。
await page.evaluate(async () => {
  const text = document.body.innerText.replace(/\s+/g, '').slice(0, 4000);
  const specs = [];
  for (const weight of [400, 500, 700, 900]) {
    specs.push(`${weight} 16px "Zen Kaku Gothic Antique"`, `${weight} 16px "Noto Sans JP"`);
  }
  specs.push(
    '500 16px Jost', '700 16px Jost',
    '600 16px "Shippori Mincho B1"', '700 16px "Shippori Mincho B1"',
    '500 16px "Barlow Semi Condensed"', '700 16px "Barlow Semi Condensed"',
    '500 16px Poppins', '700 16px Poppins',
  );
  await Promise.all(specs.map((spec) => document.fonts.load(spec, text).catch(() => {})));
  await document.fonts.ready;
});
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
  // 要素の上端が 0.5px 単位にあると element.screenshot() が 1 デバイスピクセル
  // 手前から撮ってしまい、セクション全体がカンプと 1px ずれて写る。
  // ページ全体をわずかにずらして、上端を整数 px にそろえてから撮る。
  await page.evaluate(() => { document.body.style.paddingTop = ''; });
  let box = await el.boundingBox();
  if (Math.abs(box.y - Math.round(box.y)) > 0.01) {
    await page.evaluate(() => { document.body.style.paddingTop = '0.5px'; });
    box = await el.boundingBox();
  }
  // 遅延読み込みの画像は、要素をビューポートに入れてから読み込みが始まる。
  // 読み終わる前に撮ると背景が抜けた絵になるため、必ず待つ
  // (FREE COUNSELING の背景が抜けたまま撮れていた)。
  await el.evaluate(async (node) => {
    const imgs = [...node.querySelectorAll('img')];
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return null;
        return Promise.race([
          new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          }),
          new Promise((resolve) => setTimeout(resolve, 15000)),
        ]);
      }),
    );
  });
  await page.waitForTimeout(150);
  await el.screenshot({ path: `${outDir}/${id}.png` });
  console.log(`${id.padEnd(12)} ${Math.round(box.width)}x${Math.round(box.height)}`);
}

await browser.close();
