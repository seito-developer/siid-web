'use client';

import { useEffect, useState } from 'react';

import CtaButton from '../CtaButton/CtaButton';

import styles from './StickyCta.module.css';

// 画面下部に追従する CTA(Issue #138)。SP のみで、PC(768px〜)では CSS で非表示(Issue #143)。
//
// 下へスクロールしている間は出し、上へスクロールしている間は引っ込める。
// FV には CTA があるため冒頭では出さず、予約フォーム(#counselling)が見えている間と
// それより下(フッター)でも、フォームに重なる・戻り導線になるだけなので出さない。

// FV を抜けるまでは出さない(SP の FV は設計幅 375px で高さ約 600px)
const SHOW_AFTER_PX = 600;
// アドレスバーの伸縮や慣性の揺れで出入りを繰り返さないための不感帯
const DIRECTION_THRESHOLD_PX = 8;

export default function StickyCta() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isFormReached, setIsFormReached] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < SHOW_AFTER_PX) {
        setIsScrollingDown(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD_PX) {
        return;
      }
      setIsScrollingDown(delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const form = document.getElementById('counselling');
    const io = form && 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        setIsFormReached(entries.some(
          (entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0,
        ));
      })
      : null;
    if (form) {
      io?.observe(form);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, []);

  const isVisible = isScrollingDown && !isFormReached;

  return (
    <div className={`${styles.StickyCta} ${isVisible ? styles.isVisible : ''}`}>
      <CtaButton size="sp" className={styles.StickyCta__Button} />
    </div>
  );
}
