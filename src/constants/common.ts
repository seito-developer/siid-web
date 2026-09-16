import { Poppins } from 'next/font/google';

export const BREAK_POINT = 1280;

// 日本語(Noto Sans JP)は next/font を使わず、自前サブセットを src/styles/noto-sans-jp.css で
// 読み込む(Issue #100)。CSS 変数 --font-noto-sans-jp は globals.css で定義している。

export const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
});
