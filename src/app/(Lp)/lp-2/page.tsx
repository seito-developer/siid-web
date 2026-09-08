import { Metadata, Viewport } from 'next';

import About from '@/components/Lp2/About/About';
import CanvasScale from '@/components/Lp2/CanvasScale/CanvasScale';
import CookieBanner from '@/components/Lp2/CookieBanner/CookieBanner';
import Counselling from '@/components/Lp2/Counselling/Counselling';
import Difference from '@/components/Lp2/Difference/Difference';
import Faq from '@/components/Lp2/Faq/Faq';
import Footer from '@/components/Lp2/Footer/Footer';
import Fv from '@/components/Lp2/Fv/Fv';
import Graph from '@/components/Lp2/Graph/Graph';
import Header from '@/components/Lp2/Header/Header';
import Instructor from '@/components/Lp2/Instructor/Instructor';
import Plan from '@/components/Lp2/Plan/Plan';
import Present from '@/components/Lp2/Present/Present';
import Result from '@/components/Lp2/Result/Result';
import Skill from '@/components/Lp2/Skill/Skill';
import Step from '@/components/Lp2/Step/Step';
import Strength from '@/components/Lp2/Strength/Strength';
import StructuredData from '@/components/Lp2/StructuredData/StructuredData';
import Support from '@/components/Lp2/Support/Support';
import Voice from '@/components/Lp2/Voice/Voice';
import { lp2Asset } from '@/constants/lp2Assets';
import { buildPageMetadata, pages } from '@/constants/meta';

import { barlowSemiCondensedLp2, jostLp2 } from '../fonts';

import styles from './Lp2.module.css';
import './lp2-tokens.css';

// 広告流入用の独立 LP(docs/spec/07_lp2-renewal.md)。
// (Lp)/layout.tsx は lp-1 と共有のため、lp-2 専用のフォントとトークンは
// このページのルート要素にだけ付与して lp-1 の描画に影響させない。
export const metadata: Metadata = buildPageMetadata(pages.lp2, {
  ogpImagePath: '/images/lp-2/ogp.png',
});

// リリース前チェックリスト「favicon > theme-color」。ブラウザ UI の色を FV に合わせる。
export const viewport: Viewport = {
  themeColor: '#131a3e',
  width: 'device-width',
  initialScale: 1,
};

// 見出し(Zen Kaku)と明朝(Shippori)は lp2-tokens.css のサブセットを直接読むため、
// next/font の変数は英字の 2 書体だけでよい
const fontVariables = [jostLp2.variable, barlowSemiCondensedLp2.variable].join(' ');

export default function Lp2() {
  return (
    <div className={`lp2 ${fontVariables} ${styles.Lp2}`} id="top">
      {/* LCP 要素は FV のポスター画像。CSS の background-image から参照しているため
          ブラウザが見つけるのが遅く、実測で LCP が 15 秒台になっていた。
          先に preload して CSS の解析を待たずに取得させる(PC / SP で別ファイル)。
          fetchPriority が無いとフォントと帯域を取り合って LCP が 3.4s と 6.6s に
          二極化したため、優先度を明示して先に落とし切らせる。 */}
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href={lp2Asset('/videos/lp-2/fv-sp-poster.webp')}
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href={lp2Asset('/videos/lp-2/fv-pc-poster.webp')}
        media="(min-width: 768px)"
      />
      <CanvasScale />
      <StructuredData />
      <Header />
      <main>
        <Fv />
        <About />
        <Result />
        <Instructor />
        <Strength />
        <Difference />
        <Step />
        <Skill />
        <Support />
        <Plan />
        <Graph />
        <Voice />
        <Faq />
        <Present />
        <Counselling />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
