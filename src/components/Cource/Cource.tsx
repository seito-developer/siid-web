'use client';

import { useRef, useState } from 'react';

import { COURSES } from '@/constants/courseData';

import Logo from '../Logo/Logo';

import styles from './Cource.module.css';
import CourseCard from './CourseCard/CourseCard';
import FutureItem from './FutureItem/FutureItem';
import ReskillBannerSection from './ReskillBannerSection/ReskillBannerSection';
import Timeline from './Timeline/Timeline';

export default function Cource() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 1) % COURSES.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setActiveIndex(prev => (prev - 1 + COURSES.length) % COURSES.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // 未来の項目データ
  const futureItems = [
    { number: '01', text: '8-12ヶ月でITエンジニアへ' },
    { number: '02', text: '自分が作りたいアプリを実装させ出来る' },
    { number: '03', text: '困った時に相談できる講師や先輩' },
    { number: '04', text: 'キャリアや経済不安からの脱却' },
    { number: '05', text: 'さまざまなキャリアの選択肢', subText: '（リモートワーク、有名企業、フリーランス、海外、など）' },
  ];

  return (
    <div className={styles.Cource}>
      <div className={styles.Cource__Container}>
        {/* ヘッダー */}
        <div className={styles.Cource__Header}>
          <div className={styles.Cource__Title}>{'</ Course >'}</div>
          <h2 className={styles.Cource__Heading}>コース紹介</h2>
          <div className={styles.Cource__DetailButtonContainer}>
            <a href="#" className={styles.Cource__DetailButton}>
              <span className={styles.Cource__DetailButtonText}>{'コースの\n詳細を見る'}</span>
              <svg width={11} height={11} fill="none">
                <use href="#rightArrowWhite" />
              </svg>
            </a>
          </div>
        </div>

        {/* カードスライダーセクション */}
        <div className={styles.Cource__Slider}>
          <div className={styles.Cource__CardStack} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {COURSES.map((course, index) => {
              // 相対的な位置を計算（0: アクティブ, 1: 次, 2: 次の次）
              const position = (index - activeIndex + COURSES.length) % COURSES.length;

              return (
                <div key={index} className={`${styles.Cource__Card} ${styles[`Cource__Card--${course.type}`]} ${styles[`Cource__Card--position${position}`]}`}>
                  <CourseCard {...course} />
                </div>
              );
            })}
            <button className={styles.Cource__NavButton} onClick={handlePrev} aria-label="前のコース">
              <span>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#circleLeftAllowBlue" />
                </svg>
              </span>
            </button>
            <button className={styles.Cource__NavButton} onClick={handleNext} aria-label="次のコース">
              <span>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <use href="#circleRightAllowBlue" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Reスキル講座バナー */}
        <div className={styles.Cource__ReskillBanner}>
          <ReskillBannerSection />
        </div>

        {/* SiiDで手に入る未来 */}
        <div className={styles.Cource__Future}>
          <h3 className={styles.Cource__FutureHeading}>
            <Logo fill="#000" />
            で手に入る未来
          </h3>
          <p className={styles.Cource__FutureDescription}>
            Youtubeだけでは個々の課題にパーソナライズできないとセイト自身が悩んで立ち上げたプログラミングスクール。
            <br />
            本物が本気で付き合います。
            <br />
            こんな講師から学べるスクールは他に存在し得ないと思います。
            <br />
            だからこそ成果を出していただく自信があります。
          </p>

          <ul className={styles.Cource__FutureList}>
            {futureItems.map((item, index) => (
              <FutureItem key={index} number={item.number} text={item.text} subText={item.subText} />
            ))}
          </ul>
        </div>

        {/* タイムラインセクション */}
        <div className={styles.Cource__Timeline}>
          <Timeline />
        </div>
      </div>
    </div>
  );
}
