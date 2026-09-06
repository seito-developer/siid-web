// RESULTS カルーセルのスライド。
//
// 画像は入稿データの webp_x2/(@2x・1316x772)をそのまま使う。
// PSD 内のカルーセル画像は 8 枚あるが、**キャプションは画像ではなく表示位置
// (中央 / 中 / 小)に紐づいた仮置き**で、8 枚分の個別キャプションは
// デザインデータに存在しなかった(docs/spec/07_lp2-renewal.md §15)。
//
// そのためカンプから読み取れた 5 件は実データを使い、残りは中立な仮テキストを置く。
// 事実と異なる転職実績を捏造しないため、仮の箇所に具体的な成果は書かない。
export type Lp2Result = {
  image: string;
  /** 1 行目 */
  from: string;
  /** 2 行目(強調色) */
  to: string;
  /** 実データか仮テキストか。公開前の差し替え漏れを見つけるための印 */
  isPlaceholder?: boolean;
};

export const LP2_RESULTS: Lp2Result[] = [
  { image: 'carousel-01', from: '40代男性・介護職から', to: 'Webエンジニアに転職！' },
  { image: 'carousel-02', from: '20代女性・未経験から', to: '自社開発Webエンジニアに内定！2社内定' },
  { image: 'carousel-03', from: '30代女性・非正規から', to: '正社員エンジニアに転職！' },
  { image: 'carousel-04', from: '20代・地方で完全異業種から', to: 'ITエンジニア転職！' },
  { image: 'carousel-05', from: '20代・フリーターから', to: 'ITエンジニア転職！8カ月で8社' },
  { image: 'carousel-06', from: '受講生インタビュー', to: '（キャプション未定）', isPlaceholder: true },
  { image: 'carousel-07', from: '受講生インタビュー', to: '（キャプション未定）', isPlaceholder: true },
  { image: 'carousel-08', from: '受講生インタビュー', to: '（キャプション未定）', isPlaceholder: true },
];
