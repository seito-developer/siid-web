import React from 'react';

// 旧サイトから引き継いだ、ソースコードを覗いた人向けの遊び心。
// JSX では HTML コメントを直接出力できず、要素で包むと DevTools でコメントが要素の子として表示されてしまう。
// そこでアスキーアートを script 内のブロックコメントに書いておき（view-source 用）、
// 実行時にその本文を <body> 直下の先頭へコメントノードとして挿入する（DevTools 用）。
// コメントノードは React の hydration で無視されるため、不整合は起きない。
const ASCII_ART = `
    |ω・\`）ﾁﾗ

    |ω・\`）...

    |ω・\`）< そんなに私のコードが気になるかね？

    |彡ｻｯ

`;

const SCRIPT = `/*${ASCII_ART}*/(function(){try{var t=document.currentScript.textContent;document.body.prepend(document.createComment(t.slice(2,t.indexOf('*/'))));}catch(e){}})();`;

/**
 * ソース表示・DevTools で見えるアスキーアートのコメント。body 開始直後に配置する。
 */
export default function SourceEasterEgg() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
