import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 1400 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.locator('#strength').scrollIntoViewIfNeeded();
await p.waitForTimeout(1500);
console.log(await p.evaluate(() => {
  const img = document.querySelector('#strength picture img');
  const r = img.getBoundingClientRect();
  return JSON.stringify({ natural: [img.naturalWidth, img.naturalHeight], css: [Math.round(r.width), Math.round(r.height)], src: img.currentSrc.slice(-70) });
}));
await b.close();
