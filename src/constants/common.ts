import { Noto_Sans_JP, Poppins } from "next/font/google";

export const BREAK_POINT = 1280;

export const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "900"],
});

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "900"],
});