import {
  Barlow_Semi_Condensed,
  Jost,
  Noto_Sans_JP,
  Poppins,
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_Antique,
} from 'next/font/google';

// lp-1 専用フォント。既存サイト(constants/common.ts)とはウェイト構成が異なるため
// LP 専用の変数として定義する(旧LPは Noto 400/700/900 + Poppins 500-800 + Barlow 700 を使用)。
export const notoSansJpLp = Noto_Sans_JP({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp-lp',
});

export const poppinsLp = Poppins({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins-lp',
});

export const barlowSemiCondensedLp = Barlow_Semi_Condensed({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow-lp',
});

// --- lp-2(新デザイン)専用フォント ---
//
// デザインで使われている商用フォントは使用できないため無料 Web フォントへ置換する
// (docs/spec/07_lp2-renewal.md §6)。lp-1 の描画に影響させないよう別変数で定義する。

// 見出し・CTA・強調。筑紫ゴシック H / E の代替。
// 筑紫ゴシックはオールドスタイルの温かみを意図した人文的書体であり、
// 同じ設計思想を持つ Zen Kaku Gothic Antique が最も近い。
export const zenKakuGothicAntiqueLp2 = Zen_Kaku_Gothic_Antique({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-lp2',
  // 日本語フォントは unicode-range で 100 以上のファイルに分割配信される。
  // preload を有効にすると全チャンクの <link rel="preload"> が head に並び
  // (実測 489 本)、初期リクエストが激増して LCP を悪化させる。
  // display: swap で実際に使う文字のチャンクだけを遅延取得させる。
  preload: false,
});

// 英字セクションラベル(RESULTS / VOICE 等)と装飾数字。FuturaPT / Futura / Avenir の代替。
export const jostLp2 = Jost({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin-lp2',
});

// 給付金バッジ。筑紫明朝の代替。
export const shipporiMinchoB1Lp2 = Shippori_Mincho_B1({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mincho-lp2',
  // 日本語フォントのため preload しない(理由は zenKakuGothicAntiqueLp2 を参照)
  preload: false,
});

// STEP ラベル。DIN 2014 の代替。lp-1 用は 700 のみのため lp-2 用に別途定義する。
export const barlowSemiCondensedLp2 = Barlow_Semi_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-condensed-lp2',
});
