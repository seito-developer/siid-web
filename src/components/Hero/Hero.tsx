'use client';

import React from 'react';

import useIsPc from '@/hooks/useIsPc';
import { NewsPost } from '@/types/news';

import Corner, { CornerPosition } from '../Corner/Corner';
import NavigationPc from '../Navigation/NavigationPc/NavigationPc';
import News from '../News/News';
import ReskillBanner from '../ReskillBanner/ReskillBanner';

import styles from './Hero.module.css';
import HeroBackLogo from './HeroBackLogo';
import HeroMainCopy from './HeroMainCopy/HeroMainCopy';
import HeroMainCopyPc from './HeroMainCopy/HeroMainCopyPc';
import HeroSubCopy from './HeroSubCopy/HeroSubCopy';
import HeroSubCopyPc from './HeroSubCopy/HeroSubCopyPc';
import ScrollDown from './ScrollDown/ScrollDown';


type HeroProps = {
  news: NewsPost[];
};

export default function Hero({ news }: HeroProps) {
  const isPc = useIsPc();

  return (
    <div className={styles.Hero}>
      <div className={styles.Hero__Copy}>
        <div className={styles.Hero__MainCopy} data-opening="main-copy">
          {isPc ? <HeroMainCopyPc /> : <HeroMainCopy />}
        </div>
        <div className={styles.Hero__SubCopy} data-opening="sub-copy">
          {isPc ? <HeroSubCopyPc /> : <HeroSubCopy />}
        </div>
      </div>
      <div className={styles.Hero__BackLogo}>
        <div data-opening="back-logo">
          <HeroBackLogo />
        </div>
      </div>
      <div className={styles.Hero__ScrollDown} data-opening="scroll-down">
        <ScrollDown />
      </div>
      {isPc && (
        <>
          <div className={styles.Hero__RigtBottomCorner}>
            <Corner
              width="16px"
              height="16px"
              bottom="0"
              right="0"
              position={CornerPosition.BOTTOM_RIGHT}
            />
          </div>
          <div className={styles.Hero__News} data-opening="ui">
            <News posts={news} />
          </div>
          <div className={styles.Hero__ReskillBanner} data-opening="ui">
            <ReskillBanner />
          </div>
          <div className={styles.Hero__Navigation}>
            <div data-opening="ui">
              <NavigationPc />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
