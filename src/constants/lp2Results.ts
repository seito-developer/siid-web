// RESULTS カルーセルの確定原稿（Issue #73 / 2026-09-10）。
// 入稿画像 img_carousel01〜08.webp に対応する公開アセット carousel-01〜08 を使用。
export type Lp2Result = {
  image: string;
  /** 1行目 */
  from: string;
  /** 2行目（強調色） */
  to: string;
};

export const LP2_RESULTS: Lp2Result[] = [
  { image: 'carousel-01', from: '40代男性・介護職から', to: 'Webエンジニアに転職！' },
  { image: 'carousel-02', from: '40代女性・非正規から', to: 'Webエンジニアに転職！' },
  { image: 'carousel-03', from: '20代男性・フリーターから', to: '8社内定・エンジニアへ転職！' },
  { image: 'carousel-04', from: '20代男性・学生から', to: 'メガベンチャー含む3社に内定！' },
  { image: 'carousel-05', from: '30代男性・営業職から', to: '逆オファーでエンジニア内定！' },
  { image: 'carousel-06', from: '20代男性・公務員から', to: 'データサイエンティストに1発内定！' },
  { image: 'carousel-07', from: '20代男性・物流系から', to: 'IT/Webエンジニア3社に内定！' },
  { image: 'carousel-08', from: '20代女性・医療職から', to: '7ヶ月でエンジニア職で2社内定！' },
];
