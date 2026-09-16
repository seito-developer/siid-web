// 自前サブセット(Issue #100)の収録漏れを検査する。`npm run check:fonts`。
//
// src/ の日本語がすべて core.txt に入っていることを確かめる。漏れていても表示は
// 崩れない(JIS 第1水準までは ext が肩代わりする)が、そのページだけ 340KB を
// 余分に取得することになるため、コミット前に気付けるようにする。
import fs from 'node:fs';

import { collectSourceChars } from './source-chars.mjs';

const core = new Set(fs.readFileSync('scripts/fonts/charsets/core.txt', 'utf-8'));
const missing = [...collectSourceChars()].filter((c) => !core.has(c)).sort();

if (missing.length === 0) {
  console.log('フォントの収録文字: 漏れなし');
  process.exit(0);
}

console.error(`フォントの収録漏れ ${missing.length} 文字: ${missing.join('')}`);
console.error('');
console.error('次を実行して作り直してください(docs/spec/05_deploy.md):');
console.error('  npm run build && PORT=3005 npm start &');
console.error('  MAIN_FONT_URL=http://localhost:3005/siid ./scripts/fonts/subset-noto-sans-jp.sh --collect');
process.exit(1);
