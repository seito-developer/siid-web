import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const sec = document.querySelector('#voice');
  const st = sec.getBoundingClientRect().top;
  const out = [];
  const add = (q) => { for (const el of sec.querySelectorAll(q)) { const r = el.getBoundingClientRect();
    out.push(`${q.padEnd(28)} ${Math.round(r.width)}x${Math.round(r.height)} @(${Math.round(r.left)},${Math.round(r.top - st)}) ${el.textContent.trim().slice(0,14)}`); } };
  add('h2'); add('ul'); add('li'); add('[class*=Voice__Title]'); add('[class*=Voice__Text]');
  add('[class*=Voice__Lead]'); add('[class*=Voice__Body]'); add('[class*=Voice__More]');
  add('[class*=Voice__Note]');
  return out.join('\n');
}));
await b.close();
