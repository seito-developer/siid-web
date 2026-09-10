// 実装したセクションの要素位置を、セクション上端からの相対座標で出す。
//
//   node scripts/lp-career/measure-section.mjs about pc
//   node scripts/lp-career/measure-section.mjs about sp
//
// SP は CSS px で出るので、カンプ(@2x)の値と比べるときは 2 倍する。
// docs/spec/lp-career-sections/ の実測値と突き合わせて座標を詰めるために使う。
import { chromium } from 'playwright';

const id = process.argv[2];
const side = process.argv[3] === 'sp' ? 'sp' : 'pc';
if (!id) {
  console.error('usage: node scripts/lp-career/measure-section.mjs <セクションid> [pc|sp]');
  process.exit(1);
}

const width = side === 'sp' ? 375 : 1440;
const url = process.env.LP_CAREER_URL ?? 'http://localhost:3000/siid/lp-career';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => {
  try { localStorage.setItem('lp-career-cookie-consent', 'accepted'); } catch {}
});
await page.goto(url, { waitUntil: 'networkidle' });

const result = await page.evaluate((sectionId) => {
  const sec = document.querySelector(`#${sectionId}`);
  if (!sec) return null;
  const base = sec.getBoundingClientRect();
  const rows = [];
  const walk = (el, depth) => {
    for (const child of el.children) {
      const cls = [...child.classList].find((c) => c.includes('__'));
      const r = child.getBoundingClientRect();
      if (cls && r.width > 0 && r.height > 0) {
        rows.push({
          depth,
          name: cls.replace(/^.*?__/, '').replace(/_.*$/, ''),
          top: Math.round(r.top - base.top),
          left: Math.round(r.left - base.left),
          w: Math.round(r.width),
          h: Math.round(r.height),
          text: (child.textContent || '').trim().slice(0, 18),
        });
      }
      if (depth < 3) walk(child, depth + 1);
    }
  };
  walk(sec, 0);
  return { height: Math.round(base.height), rows };
}, id);

if (!result) {
  console.error(`セクションが見つかりません: #${id}`);
  await browser.close();
  process.exit(1);
}

console.log(`#${id} [${side}]  セクション高 ${result.height}px`);
for (const r of result.rows) {
  const indent = '  '.repeat(r.depth);
  console.log(
    `${indent}${r.name.padEnd(16)} @(${String(r.left).padStart(4)},${String(r.top).padStart(5)}) ` +
      `${String(r.w).padStart(4)}x${String(r.h).padEnd(4)} ${r.text}`,
  );
}

await browser.close();
