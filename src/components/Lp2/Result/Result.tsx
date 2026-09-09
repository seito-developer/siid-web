'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_RESULTS } from '@/constants/lp2Results';

import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Result.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// RESULTS(docs/spec/lp2-sections/04-result.md)。
// 中央が大きく左右が段階的に小さくなるカルーセル。
//
// PSD 実測は中央 623x352 / 中 224x127 / 小 105x60 で、縮小率が 36% → 17% と急峻。
// Swiper の coverflow ではこの落差を出せないため、5 枚を等幅で並べたうえで
// スライドの状態(active / prev / next)ごとに CSS で倍率を指定して再現する。

// 表示中のスライドとその前後(端はループでつながる)かどうか
function isNear(index: number, active: number) {
  const last = LP2_RESULTS.length - 1;
  const distance = Math.min(
    Math.abs(index - active),
    Math.abs(index - active + LP2_RESULTS.length),
    Math.abs(index - active - LP2_RESULTS.length),
  );
  return distance <= 2 || last < 2;
}

export default function Result() {
  // キャプションはスライドの外に出す。スライドを transform で拡大するため、
  // 中に入れると文字まで拡大されてしまう。PSD でも文言が付くのは中央だけ。
  const [activeIndex, setActiveIndex] = useState(0);
  const active = LP2_RESULTS[activeIndex] ?? LP2_RESULTS[0];

  return (
    <section className={styles.Result} id="result">
      <SectionBg name="result" pcWidth={1440} pcHeight={780} spWidth={750} spHeight={1069} />

      <SectionLabel gradient>RESULTS</SectionLabel>

      {/* SP は「未経験から、」で改行する(カンプの組み方) */}
      <h2 className={styles.Result__Title}>
        <span className={styles.Result__TitleLine1}>
          <span className={styles.Result__TitleAccent}>未経験</span>から、
        </span>
        <span className={styles.Result__TitleBreak} />
        ここまで
        <span className={styles.Result__TitleAccent2}>目指せる！</span>
      </h2>

      <div className={styles.Result__Carousel}>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          // Swiper の A11y モジュールは矢印・ドットの aria-label を英語の既定文
          // ("Next slide" 等)で上書きするため、日本語の文言を渡す
          a11y={{
            prevSlideMessage: '前の実績へ',
            nextSlideMessage: '次の実績へ',
            paginationBulletMessage: '{{index}} 件目の実績を表示',
            slideLabelMessage: '{{index}} / {{slidesLength}}',
          }}
          centeredSlides
          loop
          watchSlidesProgress
          slidesPerView={1}
          spaceBetween={0}
          navigation={{
            prevEl: `.${styles.Result__Prev}`,
            nextEl: `.${styles.Result__Next}`,
          }}
          pagination={{ clickable: true, el: `.${styles.Result__Pagination}` }}
          breakpoints={{
            768: { slidesPerView: 5, spaceBetween: 0 },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className={styles.Result__Swiper}
        >
          {LP2_RESULTS.map((item, i) => (
            <SwiperSlide key={item.image} className={styles.Result__Slide}>
              {/* スライドは横に並んでいてビューポート内に入るため loading="lazy" が効かない。
                  PC で見える中央と左右2枚ずつを描画する */}
              {isNear(i, activeIndex) ? (
                <Image
                  src={lp2Asset(`/images/lp-2/results/${item.image}.webp`)}
                  alt={`${item.from} ${item.to}`.trim()}
                  width={1316}
                  height={772}
                  sizes="(min-width: 768px) 623px, 70vw"
                  className={styles.Result__Image}
                  quality={LP2_IMAGE_QUALITY}
                />
              ) : (
                <span className={styles.Result__Image} aria-hidden="true" />
              )}
              <p className={styles.Result__SideCaption} aria-hidden="true">
                {item.from}<br /><span>{item.to}</span>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <button type="button" className={styles.Result__Prev} aria-label="前の実績へ">
          <svg viewBox="0 0 12 18" width="8" height="12" aria-hidden="true" focusable="false">
            <path d="M11 1 L3 9 L11 17" stroke="currentColor" strokeWidth="2.4" fill="none" />
          </svg>
        </button>
        <button type="button" className={styles.Result__Next} aria-label="次の実績へ">
          <svg viewBox="0 0 12 18" width="8" height="12" aria-hidden="true" focusable="false">
            <path d="M1 1 L9 9 L1 17" stroke="currentColor" strokeWidth="2.4" fill="none" />
          </svg>
        </button>
        <div className={styles.Result__Pagination} />
      </div>

      <p className={styles.Result__Caption} aria-live="polite">
        {active.from}
        {active.to && (
          <>
            <br />
            <span className={styles.Result__CaptionAccent}>{active.to}</span>
          </>
        )}
      </p>

      <p className={styles.Result__Note}>※個人の実績であり、成果を保証するものではありません</p>
    </section>
  );
}
