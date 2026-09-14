import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 1400 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000/siid/lp-career', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
for (const id of ['instructor', 'strength']) {
  await p.locator('#' + id).scrollIntoViewIfNeeded();
  await p.waitForTimeout(1200);
}
console.log(await p.evaluate(() => {
  const out = [];
  for (const id of ['about', 'instructor', 'strength']) {
    const img = document.querySelector(`#${id} picture img`);
    out.push(`${id}: natural=${img.naturalWidth}x${img.naturalHeight} src=${img.currentSrc.slice(-40)}`);
  }
  return out.join('\n');
}));
await b.close();
