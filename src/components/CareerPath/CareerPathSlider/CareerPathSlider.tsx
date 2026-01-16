'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './CareerPathSlider.module.css';
import MarqueeText from './MarqueeText/MarqueeText';

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
  {
    id: 9,
    youtubeUrl: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '/images/careerpath/careerpathslider/slider01.jpg',
    title: '文系学生からスタートアップのフロントエンド・インターン内定！',
    tags: ['転職成功', '実務経験', 'キャリアアップ'],
  },
  {
    id: 10,
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
      } else {
        swiperRef.current.autoplay.start();
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
          }}
          breakpoints={{
            1280: {
              spaceBetween: -10,
            },
          }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
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
            <button className={`${styles.AutoplayButton} ${isAutoplayRunning ? styles.AutoplayButton__Pause : styles.AutoplayButton__Play}`} onClick={toggleAutoplay} aria-label={isAutoplayRunning ? '自動再生を停止' : '自動再生を開始'} />
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
