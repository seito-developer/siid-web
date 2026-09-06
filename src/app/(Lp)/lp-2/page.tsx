import { Metadata } from 'next';

import About from '@/components/Lp2/About/About';
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
import Support from '@/components/Lp2/Support/Support';
import Voice from '@/components/Lp2/Voice/Voice';
import { buildPageMetadata, pages } from '@/constants/meta';

import {
  barlowSemiCondensedLp2,
  jostLp2,
  shipporiMinchoB1Lp2,
  zenKakuGothicAntiqueLp2,
} from '../fonts';

import styles from './Lp2.module.css';
import './lp2-tokens.css';

// 広告流入用の独立 LP(docs/spec/07_lp2-renewal.md)。
// (Lp)/layout.tsx は lp-1 と共有のため、lp-2 専用のフォントとトークンは
// このページのルート要素にだけ付与して lp-1 の描画に影響させない。
export const metadata: Metadata = buildPageMetadata(pages.lp2, {
  ogpImagePath: '/images/lp-2/ogp.png',
});

const fontVariables = [
  zenKakuGothicAntiqueLp2.variable,
  jostLp2.variable,
  shipporiMinchoB1Lp2.variable,
  barlowSemiCondensedLp2.variable,
].join(' ');

export default function Lp2() {
  return (
    <div className={`lp2 ${fontVariables} ${styles.Lp2}`} id="top">
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
