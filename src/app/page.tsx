import { Metadata } from 'next';

import CareerPath from '@/components/CareerPath/CareerPath';
import Comparison from '@/components/Comparison/Comparison';
import Cource from '@/components/Cource/Cource';
import GenerativeAi from '@/components/GenerativeAi/GenerativeAi';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
// import LoadingScreenInner from '@/components/LoadingScreen/LoadingScreenInner/LoadingScreenInner';
import Message from '@/components/Message/Message';
import News from '@/components/News/News';
import Reason from '@/components/Reason/Reason';
import ReskillBanner from '@/components/ReskillBanner/ReskillBanner';
import Supporter from '@/components/Supporter/Supporter';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Home.module.css';
import HomeLayout from './homeLayout';
export const metadata: Metadata = {
  title: commonTitle,
  description: handleStringHTML(pages.index.description, false),
};

export default function Home() {
  return (
    <>
      {/* <LoadingScreenInner /> */}
      <HomeLayout>
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
            <div className={styles.Home__Comparison}>
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
            <div className={styles.Home__Cource}>
              <Cource />
            </div>
            <div className={styles.Home__CareerPath}>
              <CareerPath />
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
