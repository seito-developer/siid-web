import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const th = document.querySelector('#graph thead th:nth-child(2)');
  const cs = getComputedStyle(th);
  return JSON.stringify({ height: cs.height, fontSize: cs.fontSize, bg: cs.backgroundColor });
}));
await b.close();
