import { Barlow_Semi_Condensed, Jost } from 'next/font/google';

// (Lp) の本文は lp-career-tokens.css のサブセット('Noto Sans JP Subset')を使う。
// next/font 経由の Noto Sans JP は unicode-range で 124 チャンク × 4 ウェイトの
// @font-face を生成し、それだけで 380KB のレンダリングブロック CSS になっていたため
// 廃止した(Issue #100)。
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
