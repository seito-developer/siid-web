'use client';

import Image from 'next/image';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Benefits.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 各特典の画像（現行サイト bug-fix.org/siid/counseling の特典画像）と説明文（alt 用）
const benefits: { image: string; label: string }[] = [
  {
    image: '/siid/images/counseling/gift-1.jpg',
    label: '【Win/Mac対応】1分でわかる！プログラミング学習向けPCの選び方（PCを30%割引で買える裏技つき）',
  },
  {
    image: '/siid/images/counseling/gift-2.jpg',
    label: '【歴14年エンジニアが選ぶ】主要AIツール5選・完全解説ガイド',
  },
  {
    image: '/siid/images/counseling/gift-3.jpg',
    label: '【歴13年のエンジニアが活用する】Claude Code & Codex 裏ワザ＆プロンプト９セット',
  },
  {
    image: '/siid/images/counseling/gift-4.jpg',
    label: '【Tier表別】AI時代のプログラミング言語27選・完全解説ガイド',
  },
  {
    image: '/siid/images/counseling/gift-5.jpg',
    label: '300人の受講生データから作った「あなたのAI時代キャリア適性診断」GPTs',
  },
  {
    image: '/siid/images/counseling/gift-6.jpg',
    label: '【実例ベース】年代別・未経験からエンジニア＆AI関連職へ転職までの20〜40代ロードマップ',
  },
  {
    image: '/siid/images/counseling/gift-7.jpg',
    label: '【外資テック内定エンジニア直伝】フルスタックエンジニアへの完全ロードマップ75分特別動画講義',
  },
];

export default function Benefits() {
  return (
    <section className={styles.Benefits} aria-labelledby="counseling-benefits-title">
      <div className={styles.Benefits__Head}>
        <p className={styles.Benefits__Lead}>無料カウンセリング参加者限定</p>
        <h2 id="counseling-benefits-title" className={styles.Benefits__Title}>
          <span className={styles.Benefits__TitleNum}>7</span>大特典をプレゼント
        </h2>
      </div>
      <div className={styles.Benefits__Slider}>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={16}
          loop={true}
          speed={500}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: `.${styles.Benefits__NavPrev}`,
            nextEl: `.${styles.Benefits__NavNext}`,
          }}>
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index} className={styles.Benefits__Slide}>
              <span className={styles.Benefits__Badge} aria-hidden="true">
                特典{String(index + 1).padStart(2, '0')}
              </span>
              <Image
                src={benefit.image}
                alt={benefit.label}
                width={900}
                height={1295}
                className={styles.Benefits__Image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={`${styles.Benefits__Nav} ${styles.Benefits__NavPrev}`}
          aria-label="前の特典">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.Benefits__Nav} ${styles.Benefits__NavNext}`}
          aria-label="次の特典">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
