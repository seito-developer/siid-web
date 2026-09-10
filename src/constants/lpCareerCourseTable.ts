// コース比較表(docs/spec/lp-career-sections/12-graph.notes.md からの書き起こし)。
//
// PSD 上は 1 枚のスマートオブジェクトに統合されていてテキストを取り出せないため、
// 書き出した画像から内容を読み取って構造化した。
//
// 改行位置もカンプの組みに合わせて `\n` で持つ(CSS 側は white-space: pre-line)。
// 自動折り返しに任せると「AI活用・転職/準備」のように語中で切れてしまうため。
export const LP_CAREER_COURSE_TABLE = {
  head: ['コースの違い', 'Career', 'FullSupport', 'VIP'],
  rows: [
    {
      label: '目標とする\nゴール',
      values: [
        'Web開発の基礎・\nAI活用・転職準備',
        'Web／ITエンジニア内定・\n実務レベルの開発力',
        '転職・事業・技術導入を\n個別設計',
      ],
    },
    {
      label: 'こんな人に\nおすすめ',
      values: [
        '基礎から学びたい・\nまず転職に挑戦したい',
        '仕事と両立したい・\n最新技術まで学びたい',
        '1on1を重視・事業／\n法人課題も 相談したい',
      ],
    },
    { label: '添削・\n模擬面接', values: ['各工程2回', '無制限', '個別設計'] },
    { label: 'モダン技術', values: ['標準', 'Python / TS / React', '個別設計'] },
    { label: '個別1on1', values: ['—', '◎', '◎'] },
    { label: '疑似案件', values: ['—', '◎', '◎'] },
    { label: '求人紹介', values: ['◎', '◎', '応相談'] },
    { label: 'アフター支援', values: ['—', '最長＋2年', '応相談'] },
    { label: '法人研修', values: ['—', '—', '対応'] },
    {
      label: 'プランの特徴',
      values: ['給付金で最大80%OFF', '添削・カリキュラム無制限', '企業研修にも対応'],
    },
    {
      label: '学習スタイル',
      values: [
        '動画教材・課題・\nアプリ開発・自分のペース',
        '個別学習計画・実務型開発・\n集中サポート',
        'FullSupport全内容・主任講師\n1on1・完全個別設計',
      ],
    },
    {
      label: '学習範囲',
      values: [
        'AI・Web基礎・PHP／Laravel\n・DB・Git・Docker・転職対策',
        'Career全範囲・TypeScript・\nReact／Next.js・\nPython・ データ分析',
        '必要技術を選定・Web／AI・\n業務DX・事業／法人対応',
      ],
    },
    {
      label: '実施内容',
      values: [
        '初回個別相談・24時間チャット・\nZoom・添削／面接 各2回',
        '定期相談・24時間チャット・\nZoom・添削無制限・疑似案件',
        '主任講師1on1・技術／事業相談・\n法人研修・特殊要件対応',
      ],
    },
    {
      label: '学習期間',
      values: [
        '12ヶ月・目安500〜1,000時間',
        '12ヶ月＋・アフター支援\n最長2年',
        '期間・人数・内容を個別設計',
      ],
    },
  ],
};
