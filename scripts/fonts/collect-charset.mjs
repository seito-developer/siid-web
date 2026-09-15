// 実ページの描画テキストから収録文字を採取する(Issue #100)。
// scripts/fonts/subset-noto-sans-jp.sh --collect から呼ばれる。
import { chromium } from 'playwright';

const BASE = process.env.MAIN_FONT_URL ?? 'https://bug-fix.org/siid';
const PATHS = ['', 'service', 'courses', 'community', 'line', 'white-paper', 'counseling',
  'counseling/complete', 'counseling-complete', 'career-path/1', 'career-path/2', 'career-path/3',
  'no-such-page'];

const browser = await chromium.launch();
const page = await browser.newPage();
let text = '';
for (const p of PATHS) {
  try {
    await page.goto(`${BASE}/${p}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
      }
    });
    text += await page.evaluate(() => document.body.innerText);
  } catch (e) {
    console.error(`  採取できず: /${p} (${e.message})`);
  }
}
await browser.close();
process.stdout.write(text);
