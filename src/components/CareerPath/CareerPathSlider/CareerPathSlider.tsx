'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { CareerPathData } from '@/types/career';
import { getYouTubeThumbnailUrl } from '@/utils/youtube';

import styles from './CareerPathSlider.module.css';
import MarqueeText from './MarqueeText/MarqueeText';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// カードデータ型（UI用）
type CareerCard = {
  id: number;
  youtubeUrl: string;
  thumbnail: string;
  title: string;
  tags: string[];
};

// Props型定義
type Props = {
  data: CareerPathData[];
};

// スライダー設定の定数
const AUTOPLAY_DELAY = 3000; // 3秒
const CIRCLE_RADIUS = 8; // インジケーター円の半径
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // 円周

export default function CareerPathSlider({ data }: Props) {
  // データ変換: CareerPathData → CareerCard
  const careerCards: CareerCard[] = data.map(item => ({
    id: parseInt(item.id, 10),
    youtubeUrl: `https://www.youtube.com/watch?v=${item.youtubeId}`,
    thumbnail: getYouTubeThumbnailUrl(item.youtubeId),
    title: item.title,
    tags: item.tags,
  }));

  const [isAutoplayRunning, setIsAutoplayRunning] = useState(false); // 初期状態はfalse
  const [isVisible, setIsVisible] = useState(false); // スライダーが画面内に入ったかどうか
  const swiperRef = useRef<SwiperType | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null); // Intersection Observer用
  const pausedProgressRef = useRef<number>(0); // Pause時の進捗（0-1）を保存
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null); // 手動タイマー
  const manualAnimationRef = useRef<number | null>(null); // 手動アニメーション
  const manualStartTimeRef = useRef<number | null>(null); // 手動アニメーション開始時刻

  // Intersection Observerでスライダーが画面内に入ったことを検知
  useEffect(() => {
    const currentSlider = sliderRef.current; // クリーンアップ用に保存

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            // スライダーが画面内に入った
            setIsVisible(true);

            // 少し遅延してからautoplayを開始
            setTimeout(() => {
              if (swiperRef.current && !swiperRef.current.autoplay.running) {
                swiperRef.current.autoplay.start();
                setIsAutoplayRunning(true);
              }
            }, 500);
          }
        });
      },
      {
        threshold: 0.3, // 30%表示されたら発火
      },
    );

    if (currentSlider) {
      observer.observe(currentSlider);
    }

    return () => {
      if (currentSlider) {
        observer.unobserve(currentSlider);
      }
    };
  }, [isVisible]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  // インジケーターの進捗を更新
  const updateIndicatorProgress = (progress: number) => {
    const activeBullet = document.querySelector(`.${styles.CustomPagination} .swiper-pagination-bullet-active`);
    const circle = activeBullet?.querySelector('circle') as SVGCircleElement | null;

    if (circle) {
      // progress: 1（開始）→ 0（終了）なので、反転させる
      const offset = CIRCLE_CIRCUMFERENCE * progress;
      circle.style.strokeDashoffset = `${offset}`;
    }
  };

  // インジケーターをリセット
  const resetIndicator = () => {
    const allBullets = document.querySelectorAll(`.${styles.CustomPagination} .swiper-pagination-bullet`);
    allBullets.forEach(bullet => {
      const circle = bullet.querySelector('circle') as SVGCircleElement | null;
      if (circle) {
        circle.style.strokeDashoffset = `${CIRCLE_CIRCUMFERENCE}`;
      }
    });
    // pausedProgressRefはリセットしない（Pause状態を保持）
  };

  const stopManualAnimation = () => {
    if (manualAnimationRef.current) {
      cancelAnimationFrame(manualAnimationRef.current);
      manualAnimationRef.current = null;
    }
    if (manualTimerRef.current) {
      clearTimeout(manualTimerRef.current);
      manualTimerRef.current = null;
    }
    manualStartTimeRef.current = null;
  };

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplayRunning) {
        // 手動アニメーションを停止
        stopManualAnimation();

        swiperRef.current.autoplay.stop();
        setIsAutoplayRunning(false);
      } else {
        // 保存された進捗がある場合
        if (pausedProgressRef.current > 0 && pausedProgressRef.current < 1) {
          // 残り時間を計算
          const remainingTime = Math.round(AUTOPLAY_DELAY * pausedProgressRef.current);

          setIsAutoplayRunning(true);

          // 手動アニメーションで進捗を更新
          const startProgress = pausedProgressRef.current;
          manualStartTimeRef.current = Date.now();

          const animate = () => {
            if (!manualStartTimeRef.current) {
              return;
            }

            const elapsed = Date.now() - manualStartTimeRef.current;
            const progress = Math.min(elapsed / remainingTime, 1);

            // percentage: 残り時間の割合（1 → 0）
            const currentPercentage = startProgress * (1 - progress);
            updateIndicatorProgress(currentPercentage);
            pausedProgressRef.current = currentPercentage;

            if (progress < 1) {
              manualAnimationRef.current = requestAnimationFrame(animate);
            } else {
              // アニメーション完了、次のスライドへ
              if (swiperRef.current) {
                swiperRef.current.slideNext();
              }
            }
          };

          manualAnimationRef.current = requestAnimationFrame(animate);
        } else {
          swiperRef.current.autoplay.start();
          setIsAutoplayRunning(true);
        }
      }
    }
  };

  return (
    <div className={styles.SliderWrapper} ref={sliderRef}>
      <div className={styles.Slider}>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={15}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          speed={600}
          autoplay={isVisible ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false } : false}
          pagination={{
            clickable: true,
            el: `.${styles.CustomPagination}`,
            renderBullet: (index, className) => {
              return `
                <span class="${className}">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="${CIRCLE_RADIUS}" fill="none" stroke="#a75884" stroke-width="2" stroke-linecap="round" transform="rotate(-90 12 12)" stroke-dasharray="${CIRCLE_CIRCUMFERENCE}" stroke-dashoffset="${CIRCLE_CIRCUMFERENCE}" />
                  </svg>
                </span>
              `;
            },
          }}
          breakpoints={{
            1280: {
              spaceBetween: -10,
            },
          }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          onSlideChangeTransitionStart={() => {
            // 手動アニメーションを停止
            stopManualAnimation();

            // インジケーターをリセット
            resetIndicator();

            // スライドが変わったので、保存状態をクリア（新しいスライドは最初から）
            pausedProgressRef.current = 0;

            // Pause中の場合、autoplayを停止
            if (!isAutoplayRunning && swiperRef.current) {
              swiperRef.current.autoplay.stop();
            } else if (isAutoplayRunning && swiperRef.current) {
              // 再生中の場合、autoplayが正しく動いているか確認して、必要なら再開
              if (!swiperRef.current.autoplay.running) {
                swiperRef.current.autoplay.start();
              }
            }
          }}
          onAutoplayTimeLeft={(swiper, timeLeft, percentage) => {
            // percentage: 1（開始）→ 0（終了）
            // この値をそのまま使用してインジケーターを更新

            // 値のバリデーション（0-1の範囲内）
            const validPercentage = Math.max(0, Math.min(1, percentage));
            updateIndicatorProgress(validPercentage);

            // 再生中の場合のみ進捗を保存
            if (isAutoplayRunning) {
              pausedProgressRef.current = validPercentage;
            }
          }}>
          {careerCards.map(card => (
            <SwiperSlide key={card.id}>
              <div className={styles.Card}>
                <Link href={card.youtubeUrl} className={styles.CardImageLink} target="_blank" rel="noopener noreferrer">
                  <Image src={card.thumbnail} alt="" className={styles.CardImage} width={1280} height={720} />
                </Link>
                <Link href={card.youtubeUrl} className={styles.CardTitleLink} target="_blank" rel="noopener noreferrer">
                  <h3 className={styles.CardTitle}>{card.title}</h3>
                </Link>
                <div className={styles.CardTags}>
                  {card.tags.map((tag, index) => (
                    <span key={index} className={styles.CardTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <button className={`${styles.NavButton} ${styles.NavButtonPc}`} onClick={handlePrev} aria-label="前のスライド">
            <span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <use href="#circleLeftAllowBlue" />
              </svg>
            </span>
          </button>
          <button className={`${styles.NavButton} ${styles.NavButtonPc}`} onClick={handleNext} aria-label="次のスライド">
            <span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <use href="#circleRightAllowBlue" />
              </svg>
            </span>
          </button>
        </Swiper>
        {/* ナビゲーションコントロール */}
        <div className={styles.Controls}>
          <button className={`${styles.NavButton} ${styles.NavButtonSp}`} onClick={handlePrev} aria-label="前のスライド">
            <span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <use href="#circleLeftAllowBlue" />
              </svg>
            </span>
          </button>
          <div className={styles.CenterControls}>
            <div className={styles.CustomPagination}></div>
            <button className={styles.AutoplayButton} onClick={toggleAutoplay} aria-label={isAutoplayRunning ? '自動再生を停止' : '自動再生を開始'}>
              {isAutoplayRunning ? (
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className={styles.PauseIcon}>
                  <use href="#pause" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.PlayIcon}>
                  <use href="#play" />
                </svg>
              )}
            </button>
          </div>
          <button className={`${styles.NavButton} ${styles.NavButtonSp}`} onClick={handleNext} aria-label="次のスライド">
            <span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <use href="#circleRightAllowBlue" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* 流れるテキスト */}
      <div className={styles.MarqueeTextWrapper}>
        <MarqueeText />
      </div>
    </div>
  );
}
