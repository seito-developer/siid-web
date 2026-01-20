'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './CareerPathSlider.module.css';
import MarqueeText from './MarqueeText/MarqueeText';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// カードデータ型
type CareerCard = {
  id: number;
  youtubeUrl: string;
  thumbnail: string;
  title: string;
  tags: string[];
};

// ダミーデータ
const careerCards: CareerCard[] = [
  {
    id: 1,
    youtubeUrl: 'https://www.youtube.com/watch?v=example1',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['文系', '大学生', 'エンジニア'],
  },
  {
    id: 2,
    youtubeUrl: 'https://www.youtube.com/watch?v=example2',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['未経験', '転職', 'Webエンジニア'],
  },
  {
    id: 3,
    youtubeUrl: 'https://www.youtube.com/watch?v=example3',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['文系', '社会人', 'フルスタック'],
  },
  {
    id: 4,
    youtubeUrl: 'https://www.youtube.com/watch?v=example4',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['独学', '短期習得', 'フリーランス'],
  },
  {
    id: 5,
    youtubeUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['転職成功', '実務経験', 'キャリアアップ'],
  },
  {
    id: 6,
    youtubeUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['転職成功', '実務経験', 'キャリアアップ'],
  },
  {
    id: 7,
    youtubeUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['転職成功', '実務経験', 'キャリアアップ'],
  },
  {
    id: 8,
    youtubeUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['転職成功', '実務経験', 'キャリアアップ'],
  },
];

export default function CareerPathSlider() {
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplayRunning) {
        swiperRef.current.autoplay.stop();
        // アクティブなbulletにpausedクラスを追加
        const activeBullet = document.querySelector(`.${styles.CustomPagination} .swiper-pagination-bullet-active`);
        if (activeBullet) {
          activeBullet.classList.add('paused');
        }
      } else {
        swiperRef.current.autoplay.start();
        // 全てのbulletからpausedクラスを削除
        const allBullets = document.querySelectorAll(`.${styles.CustomPagination} .swiper-pagination-bullet`);
        allBullets.forEach(bullet => {
          bullet.classList.remove('paused');
        });
      }
      setIsAutoplayRunning(!isAutoplayRunning);
    }
  };

  return (
    <div className={styles.SliderWrapper}>
      <div className={styles.Slider}>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={15}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          speed={600}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: `.${styles.CustomPagination}`,
            renderBullet: (index, className) => {
              return `
                <span class="${className}">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#a75884" stroke-width="2" stroke-linecap="round" transform="rotate(-90 12 12)" stroke-dasharray="62.83" stroke-dashoffset="62.83" />
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
            // 全てのbulletからpausedクラスを削除してアニメーションをリセット
            const allBullets = document.querySelectorAll(`.${styles.CustomPagination} .swiper-pagination-bullet`);
            allBullets.forEach(bullet => {
              bullet.classList.remove('paused');

              // アニメーションをリセット
              const circle = bullet.querySelector('circle');
              if (circle) {
                circle.style.animation = 'none';
                void (bullet as HTMLElement).offsetHeight;
                circle.style.animation = '';
              }
            });

            // pause中の場合は新しいアクティブなbulletにpausedクラスを追加
            if (!isAutoplayRunning) {
              setTimeout(() => {
                const activeBullet = document.querySelector(`.${styles.CustomPagination} .swiper-pagination-bullet-active`);
                if (activeBullet) {
                  activeBullet.classList.add('paused');
                }
              }, 10);
            }
          }}>
          {careerCards.map(card => (
            <SwiperSlide key={card.id}>
              <div className={styles.Card}>
                <a href={card.youtubeUrl} className={styles.CardImageLink} target="_blank" rel="noopener noreferrer">
                  <Image src={card.thumbnail} alt={card.title} className={styles.CardImage} width={320} height={180} />
                </a>
                <a href={card.youtubeUrl} className={styles.CardTitleLink} target="_blank" rel="noopener noreferrer">
                  <h3 className={styles.CardTitle}>{card.title}</h3>
                </a>
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
              {isAutoplayRunning ? <PauseIcon className={styles.PauseIcon} /> : <PlayIcon className={styles.PlayIcon} />}
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
