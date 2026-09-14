import { Metadata, Viewport } from 'next';

import About from '@/components/LpCareer/About/About';
import CanvasScale from '@/components/LpCareer/CanvasScale/CanvasScale';
import CookieBanner from '@/components/LpCareer/CookieBanner/CookieBanner';
import Counselling from '@/components/LpCareer/Counselling/Counselling';
import Difference from '@/components/LpCareer/Difference/Difference';
import Faq from '@/components/LpCareer/Faq/Faq';
import Footer from '@/components/LpCareer/Footer/Footer';
import Fv from '@/components/LpCareer/Fv/Fv';
import Graph from '@/components/LpCareer/Graph/Graph';
import Header from '@/components/LpCareer/Header/Header';
import Instructor from '@/components/LpCareer/Instructor/Instructor';
import Plan from '@/components/LpCareer/Plan/Plan';
import Present from '@/components/LpCareer/Present/Present';
import Result from '@/components/LpCareer/Result/Result';
import Skill from '@/components/LpCareer/Skill/Skill';
import Step from '@/components/LpCareer/Step/Step';
import Strength from '@/components/LpCareer/Strength/Strength';
import StructuredData from '@/components/LpCareer/StructuredData/StructuredData';
import Support from '@/components/LpCareer/Support/Support';
import Voice from '@/components/LpCareer/Voice/Voice';
import { lpCareerAsset } from '@/constants/lpCareerAssets';
import { buildPageMetadata, pages } from '@/constants/meta';

import { barlowSemiCondensedLpCareer, jostLpCareer } from '../fonts';

import styles from './LpCareer.module.css';
import './lp-career-tokens.css';

// 広告流入用の独立 LP(docs/spec/07_lp-career-renewal.md)。
// lp-career 専用のフォントとトークンは (Lp)/layout.tsx ではなく、
// このページのルート要素にだけ付与する(完了ページとはトークンの適用範囲が異なるため)。
export const metadata: Metadata = buildPageMetadata(pages.lpCareer, {
  ogpImagePath: '/images/lp-career/ogp.png',
});

// リリース前チェックリスト「favicon > theme-color」。ブラウザ UI の色を FV に合わせる。
export const viewport: Viewport = {
  themeColor: '#131a3e',
  width: 'device-width',
  initialScale: 1,
};

// 見出し(Zen Kaku)と明朝(Shippori)は lp-career-tokens.css のサブセットを直接読むため、
// next/font の変数は英字の 2 書体だけでよい
const fontVariables = [jostLpCareer.variable, barlowSemiCondensedLpCareer.variable].join(' ');

export default function LpCareer() {
  return (
    <div className={`lp-career ${fontVariables} ${styles.LpCareer}`} id="top">
      {/* LCP 要素は FV のポスター画像。CSS の background-image から参照しているため
          ブラウザが見つけるのが遅く、実測で LCP が 15 秒台になっていた。
          先に preload して CSS の解析を待たずに取得させる(PC / SP で別ファイル)。
          fetchPriority が無いとフォントと帯域を取り合って LCP が 3.4s と 6.6s に
          二極化したため、優先度を明示して先に落とし切らせる。 */}
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href={lpCareerAsset('/videos/lp-career/fv-sp-poster.webp')}
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href={lpCareerAsset('/videos/lp-career/fv-pc-poster.webp')}
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
        <Present />
        <Faq />
        <Counselling />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
