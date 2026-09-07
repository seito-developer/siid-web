import { chromium } from 'playwright';
const b = await chromium.launch();
const w = Number(process.argv[2] ?? 1440);
const p = await b.newPage({ viewport: { width: w, height: 1000 } });
await p.addInitScript(() => { try { localStorage.setItem('lp2-cookie-consent', 'accepted'); } catch {} });
await p.goto('http://localhost:3001/siid/lp-2', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
// 段階スクロールで遅延読み込みを起こす
const h0 = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h0; y += 900) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(120); }
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(2500);
await p.evaluate(() => { document.querySelectorAll('video').forEach((v) => { v.pause(); v.currentTime = 0; }); });
const h = await p.evaluate(() => document.body.scrollHeight);
console.log('高さ', h);
await p.screenshot({ path: `${process.env.SPDIR}/page-${w}.png`, fullPage: true });
await b.close();
console.log('done');
