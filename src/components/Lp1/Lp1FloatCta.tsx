'use client';

import { useEffect, useRef, useState } from 'react';

// 旧LPの script.js を React 化: 縦長ビューポート(スマホ)のみ、
// 下スクロールで表示・上スクロールで非表示にする追従CTA。
export default function Lp1FloatCta() {
  const [isActive, setIsActive] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (window.innerWidth >= window.innerHeight) {
      return undefined;
    }
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      setIsActive(window.scrollY > lastScrollY.current);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={isActive ? 'float-cta-wrap is-active' : 'float-cta-wrap'} id="js-float-cta">
      <a className="float-cta" href="#cta" rel="noopener">
        <span> 無料カウンセリングを予約する </span>
        <span style={{ fontFamily: 'var(--font-poppins-lp)', fontWeight: 800 }}>→</span>
      </a>
    </div>
  );
}
