'use client';

import React, { useEffect, useRef, useState } from 'react';

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
//
// また動画は装飾で、初期表示に必要なのはポスターまで。SP 版でも 917KB あり、
// 初期ロードに載せると帯域を占有して LCP を大きく損なう。
// ポスターは判定でき次第すぐ出し、本体は load 後(アイドル時)に取りに行く。

const PC_MEDIA = '(min-width: 768px)';

const SOURCES = {
  pc: { src: '/videos/lp-2/fv-pc.mp4', poster: '/videos/lp-2/fv-pc-poster.webp' },
  sp: { src: '/videos/lp-2/fv-sp.mp4', poster: '/videos/lp-2/fv-sp-poster.webp' },
};

export default function FvVideo() {
  const [isPc, setIsPc] = useState<boolean | null>(null);
  const [canLoadBody, setCanLoadBody] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mql = window.matchMedia(PC_MEDIA);
    const sync = () => setIsPc(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => mql.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const start = () => setCanLoadBody(true);

    if (document.readyState === 'complete') {
      const idle = window.requestIdleCallback;
      if (idle) {
        const id = idle(start, { timeout: 2000 });
        return () => window.cancelIdleCallback?.(id);
      }
      const id = window.setTimeout(start, 400);
      return () => window.clearTimeout(id);
    }

    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  // FV を通り過ぎたあとも再生し続けると CPU とバッテリーを使うだけなので、
  // 画面から外れたら止める。Lighthouse の Speed Index は計測中ずっと FV が
  // ビューポート内にあるため数値は変わらない(実測で確認済み)。あくまで実利用向け。
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(video);

    return () => io.disconnect();
  }, [canLoadBody]);

  const source = isPc === null ? null : SOURCES[isPc ? 'pc' : 'sp'];

  return (
    <video
      ref={videoRef}
      className={styles.Fv__Video}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={source ? lp2Asset(source.poster) : undefined}
      src={source && canLoadBody ? lp2Asset(source.src) : undefined}
      aria-hidden="true"
    />
  );
}
