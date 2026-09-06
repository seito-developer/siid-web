import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const out = [];
  for (const sec of document.querySelectorAll('main section')) {
    const sr = sec.getBoundingClientRect();
    for (const a of sec.querySelectorAll('a[href="#counselling"]')) {
      const r = a.getBoundingClientRect();
      out.push(`${(sec.id || '?').padEnd(12)} ${Math.round(r.width)}x${Math.round(r.height)} @(${Math.round(r.left)},${Math.round(r.top - sr.top)})`);
    }
  }
  return out.join('\n');
}));
await b.close();
