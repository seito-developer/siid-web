import { Barlow_Semi_Condensed, Noto_Sans_JP, Poppins } from 'next/font/google';

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
