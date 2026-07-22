import { Metadata } from 'next';

import CareerPath from '@/components/CareerPath/CareerPath';
import Comparison from '@/components/Comparison/Comparison';
import Cource from '@/components/Cource/Cource';
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import Faq from '@/components/Faq/Faq';
import GenerativeAi from '@/components/GenerativeAi/GenerativeAi';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import JsonLd from '@/components/JsonLd/JsonLd';
import Message from '@/components/Message/Message';
import News from '@/components/News/News';
import Opening from '@/components/Opening/Opening';
import Reason from '@/components/Reason/Reason';
import ReskillBanner from '@/components/ReskillBanner/ReskillBanner';
import Supporter from '@/components/Supporter/Supporter';
import { buildPageMetadata, commonTitle, pages } from '@/constants/meta';

import styles from './Home.module.css';
export const metadata: Metadata = buildPageMetadata(pages.index, { title: commonTitle });

export default function Home() {
  return (
    <>
      <Opening />
      <FadeInOnScroll />
      <JsonLd />
      <div className={styles.Home}>
        <Header />
        <div className={styles.Home__Hero}>
          <Hero />
        </div>

        <div className={styles.Home__Contents}>
          <div className={styles.Home__News}>
            <News />
          </div>
          <div className={styles.Home__ReskillBanner}>
            <ReskillBanner />
          </div>
          <div className={styles.Home__Message}>
            <Message />
          </div>
          <div className={`${styles.Home__Comparison} fade-in-scroll`}>
            <Comparison />
          </div>
          <div className={styles.Home__Reason}>
            <Reason />
          </div>
          <div className={styles.Home__GenerativeAi}>
            <GenerativeAi />
          </div>
          <div className={styles.Home__Supporter}>
            <Supporter />
          </div>
          <div className={`${styles.Home__Cource} fade-in-scroll`}>
            <Cource />
          </div>
          <div className={styles.Home__CareerPath}>
            <CareerPath />
          </div>
          <div className={styles.Home__Faq}>
            <Faq />
          </div>
        </div>
      </div>
    </>
  );
}
