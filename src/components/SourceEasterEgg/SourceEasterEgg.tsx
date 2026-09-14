import React from 'react';

// 旧サイトから引き継いだ、ソースコードを覗いた人向けの遊び心。
// JSX では HTML コメントを直接出力できないため、非表示の div に innerHTML として埋め込む。
const ASCII_ART = `<!--
    |ω・\`）ﾁﾗ

    |ω・\`）...

    |ω・\`）< そんなに私のコードが気になるかね？

    |彡ｻｯ

-->`;

/**
 * ページのソース表示（view-source）にだけ現れるアスキーアートのコメント。
 * body 開始直後に配置する。画面表示・アクセシビリティツリーには影響しない。
 */
export default function SourceEasterEgg() {
  return <div hidden dangerouslySetInnerHTML={{ __html: ASCII_ART }} />;
}
