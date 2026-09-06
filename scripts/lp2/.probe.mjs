import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1400 } });
await p.goto('http://localhost:3000/siid/lp-2', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const sec = document.getElementById('present');
  const pic = sec.querySelector('picture');
  const before = sec.getBoundingClientRect().height;
  const picR = pic.getBoundingClientRect();
  pic.remove();
  const after = sec.getBoundingClientRect().height;
  return JSON.stringify({ before, after, pic: `${Math.round(picR.width)}x${Math.round(picR.height)}`, picDisp: 'removed' });
}));
await b.close();
