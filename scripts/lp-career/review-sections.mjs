// 通し画像を撮ったうえで、各セクションの DOM 上の位置を測って JSON に出す。
// 目視レビュー時に「通し画像のどこからどこまでがどのセクションか」を知るために使う。
//
//   node scripts/lp-career/review-sections.mjs 1440 > tmp/review/sections-1440.json
import { chromium } from 'playwright';

const b = await chromium.launch();
const w = Number(process.argv[2] ?? 1440);
const p = await b.newPage({ viewport: { width: w, height: 1000 } });
await p.addInitScript(() => { try { localStorage.setItem('lp-career-cookie-consent', 'accepted'); } catch {} });
await p.goto('http://localhost:3001/siid/lp-career', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(2000);
const h0 = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h0; y += 900) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(100); }
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(1500);
const out = await p.evaluate(() => {
  const ids = ['fv', 'about', 'result', 'instructor', 'strength', 'difference', 'step', 'skill',
    'support', 'plan', 'graph', 'voice', 'faq', 'present', 'counselling'];
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + scrollY), height: Math.round(r.height) };
  };
  const sections = {};
  ids.forEach((id) => { const el = document.getElementById(id); if (el) sections[id] = rect(el); });
  return { sections, docHeight: document.body.scrollHeight, scrollWidth: document.documentElement.scrollWidth };
});
console.log(JSON.stringify(out, null, 2));
await b.close();
