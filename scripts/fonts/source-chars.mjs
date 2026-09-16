// src/ の中で「画面に出うる」日本語の文字を集める(Issue #132)。
// コメントは表示されないので取り除く。サブセットの収録文字の生成(build-charsets.py)と
// 漏れの検査(check-charset.mjs)の両方がこの実装を使い、判定基準を1つに保つ。
import fs from 'node:fs';
import path from 'node:path';

const EXTENSIONS = new Set(['.tsx', '.ts', '.json', '.css']);
// ひらがな・カタカナ・漢字・々〆・全角記号
const JAPANESE = /[぀-ヿ一-鿿々〆！-｠]/g;
const COMMENTS = /\{\/\*[\s\S]*?\*\/\}|\/\*[\s\S]*?\*\/|\/\/.*/g;

export function collectSourceChars(root = 'src') {
  const chars = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!EXTENSIONS.has(path.extname(entry.name))) { continue; }
      const body = fs.readFileSync(full, 'utf-8').replace(COMMENTS, '');
      for (const c of body.match(JAPANESE) ?? []) { chars.add(c); }
    }
  };
  walk(root);
  return chars;
}
