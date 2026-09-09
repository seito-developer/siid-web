import assert from 'node:assert/strict';

import { chromium } from 'playwright';

// localhostのLPを起動して実行。短い本文だけでなく、本文増量時の連動も検証する。
const browser = await chromium.launch();
try {
  for (const width of [319, 349, 375, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 874 } });
    await page.goto('http://localhost:3100/siid/lp-2', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.locator('#step').evaluate((section) => {
      const items = [...section.querySelectorAll('li')];
      const valid = items.every((item) => {
        const body = item.querySelector('[class*="Step__Text"]');
        const badge = item.querySelector('[class*="Step__Badge"]').getBoundingClientRect();
        const number = item.querySelector('strong').getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(body);
        return item.getBoundingClientRect().bottom - range.getBoundingClientRect().bottom > 10
          && Math.abs(number.left + number.right - badge.left - badge.right) < 1;
      });
      const first = items[0];
      const next = items[1];
      const cta = section.querySelector('a');
      const before = [first.offsetHeight, next.offsetTop, cta.offsetTop, section.offsetHeight];
      first.querySelector('[class*="Step__Text"]').append('本文増量時の高さを検証します。'.repeat(30));
      const after = [first.offsetHeight, next.offsetTop, cta.offsetTop, section.offsetHeight];
      return { valid, growth: after.map((value, index) => value - before[index]) };
    });
    assert.ok(result.valid, `${width}px: 本文余白または番号中央寄せ`);
    assert.ok(result.growth.every((value) => value > 0), `${width}px: 高さ追従`);
    console.log(`${width}px: 本文余白・番号中央・高さ追従 OK`);
    await page.close();
  }
} finally {
  await browser.close();
}
