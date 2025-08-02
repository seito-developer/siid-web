import { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import LoadingScreenInner from '@/components/LoadingScreen/LoadingScreenInner/LoadingScreenInner';
import News from '@/components/News/News';
import ReskillBanner from '@/components/ReskillBanner/ReskillBanner';
import { commonTitle, pages  } from '@/constants/meta';
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
      <LoadingScreenInner />
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

            <div style={{ height: '1000px' }}>
              Contents Area
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}