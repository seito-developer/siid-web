import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const sec = document.getElementById('about');
  const st = sec.getBoundingClientRect().top;
  const out = [];
  for (const el of sec.querySelectorAll('[class*=About__]')) {
    const rg = document.createRange(); rg.selectNodeContents(el);
    const t = rg.getBoundingClientRect(); const r = el.getBoundingClientRect();
    out.push(`${el.className.split('__')[1] || el.className}`.slice(0,22).padEnd(22)
      + ` box ${Math.round(r.width)}x${Math.round(r.height)}@(${Math.round(r.left)},${Math.round(r.top-st)})`
      + ` ink ${Math.round(t.width)}x${Math.round(t.height)}@(${Math.round(t.left)},${Math.round(t.top-st)})`);
  }
  return out.join('\n');
}));
await b.close();
