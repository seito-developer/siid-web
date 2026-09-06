'use client';

import React, { useEffect, useState } from 'react';

import { lp2Asset } from '@/constants/lp2Assets';

import styles from './Fv.module.css';

// FV の背景動画。
//
// PC と SP で別ファイルを配信する(SP に PC 用を読ませると LCP を大きく損なう)。
// <source media="..."> は <picture> でしか効かず <video> の中では無視されるため使えない。
// CSS で 2 本の <video> を出し分ける方法も、非表示側まで丸ごとダウンロードされることを
// 実測で確認したため採らない(PC で 938KB の SP 用動画を余分に取得していた)。
//
// そのためマウント後に matchMedia で 1 本だけ選ぶ。
// 判定前は src も poster も持たせず、セクションの背景色(濃紺)を見せる。

const PC_MEDIA = '(min-width: 768px)';

const SOURCES = {
  pc: { src: '/videos/lp-2/fv-pc.mp4', poster: '/videos/lp-2/fv-pc-poster.webp' },
  sp: { src: '/videos/lp-2/fv-sp.mp4', poster: '/videos/lp-2/fv-sp-poster.webp' },
};

export default function FvVideo() {
  const [isPc, setIsPc] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(PC_MEDIA);
    const sync = () => setIsPc(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => mql.removeEventListener('change', sync);
  }, []);

  const source = isPc === null ? null : SOURCES[isPc ? 'pc' : 'sp'];

  return (
    <video
      className={styles.Fv__Video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={source ? lp2Asset(source.poster) : undefined}
      src={source ? lp2Asset(source.src) : undefined}
      aria-hidden="true"
    />
  );
}
