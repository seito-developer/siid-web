import { Barlow_Semi_Condensed, Jost, Noto_Sans_JP } from 'next/font/google';

// (Lp) グループの本文フォント。lp-base.css の body と lp-career/complete が参照する。
// 既存サイト(constants/common.ts)とはウェイト構成が異なるため LP 専用の変数として定義する。
export const notoSansJpLp = Noto_Sans_JP({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp-lp',
});


// --- lp-career(新デザイン)専用フォント ---
//
// デザインで使われている商用フォントは使用できないため無料 Web フォントへ置換する
// (docs/spec/07_lp-career-renewal.md §6)。


// 英字セクションラベル(RESULTS / VOICE 等)と装飾数字。FuturaPT / Futura / Avenir の代替。
export const jostLpCareer = Jost({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin-lp-career',
});

// 給付金バッジ。筑紫明朝の代替。

// STEP ラベル。DIN 2014 の代替。
export const barlowSemiCondensedLpCareer = Barlow_Semi_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-condensed-lp-career',
});
