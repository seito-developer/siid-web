import { chromium } from 'playwright';
const [ , , sel ] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:3000/siid/lp-career', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const out = await p.evaluate((sel) => {
  const r = [];
  for (const el of document.querySelectorAll(sel)) {
    const rg = document.createRange();
    rg.selectNodeContents(el);
    const b = rg.getBoundingClientRect();
    r.push({ t: el.textContent.trim().slice(0, 22), w: Math.round(b.width), h: Math.round(b.height) });
  }
  return r;
}, sel);
console.log(out.map(o => `${o.w}x${o.h}  ${o.t}`).join('\n'));
await b.close();
