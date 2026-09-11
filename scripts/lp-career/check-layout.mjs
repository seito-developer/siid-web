// 開閉とカルーセルの表示を実ブラウザで検証する。一致率は合否に使わない。
// LP_CAREER_URL=http://localhost:3100/siid/lp-career node scripts/lp-career/check-layout.mjs
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
const failures = [];
async function check(name, run) {
  try { await run(); console.log(`PASS ${name}`); }
  catch (error) { failures.push(name); console.error(`FAIL ${name}: ${error.message}`); }
}
try {
  await page.goto(process.env.LP_CAREER_URL ?? 'http://localhost:3001/siid/lp-career');
  await page.evaluate(() => document.fonts.ready);
  const cards = page.locator('#skill li:has(> h3)');
  await check('SP: カードの展開に後続カードが追従する', async () => {
    await cards.nth(1).scrollIntoViewIfNeeded();
    const documentTop = (locator) => locator.evaluate(el => el.getBoundingClientRect().top + scrollY);
    const before = await documentTop(cards.nth(2));
    await cards.nth(1).getByRole('button').click();
    const after = await documentTop(cards.nth(2));
    assert(after > before + 50, '開いても次のカードの位置が動かない');
    const card = await cards.nth(1).boundingBox();
    const last = await cards.nth(1).locator('ul').last().boundingBox();
    assert(last.y + last.height <= card.y + card.height + 1, '本文がカードからはみ出す');
    await cards.nth(1).getByRole('button').click();
    const restored = await documentTop(cards.nth(2));
    assert(Math.abs(restored - before) < 1, '閉じた後に元の位置へ戻らない');
  });
  await check('SP: 実績の矢印を押せる', async () => {
    const caption = page.locator('#result p[aria-live]');
    const before = await caption.textContent();
    await page.getByRole('button', { name: '次の実績へ', exact: true }).click({ timeout: 5000 });
    await page.waitForFunction(value => document.querySelector('#result p[aria-live]')?.textContent !== value, before);
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await check('PC: 実績カルーセルに5枚の画像がある', async () => {
    await page.locator('#result').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    assert(await page.locator('#result .swiper-slide img').count() >= 5, '両端の画像が描画されていない');
  });
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await check(`${width}px: 予約フォームの下端が切れない`, async () => {
      const booking = page.locator('#counselling [class*="__Booking"]').first();
      await booking.scrollIntoViewIfNeeded();
      // 外部APIの応答に依存せず、Jicooが高さを更新した状態を再現する。
      await page.locator('.jicoo-widget').evaluate(el => { el.style.height = '800px'; });
      const card = await booking.boundingBox();
      const section = await page.locator('#counselling').boundingBox();
      assert(card.y + card.height <= section.y + section.height, 'フォームがセクションからはみ出す');
    });
  }
} finally { await browser.close(); }
if (failures.length) process.exitCode = 1;
