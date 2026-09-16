'use client';

import { useEffect } from 'react';

import { getCanvasScale } from './getCanvasScale';

/** CSS の長さ同士の除算に未対応のブラウザだけ、同じ縮尺を数値で補う。 */
export default function CanvasScale() {
  useEffect(() => {
    if (CSS.supports('zoom', 'calc(100vw / 375px)')) {return;}

    const root = document.querySelector<HTMLElement>('.lp-career');
    if (!root) {return;}

    function updateScale() {
      root?.style.setProperty('--lp-career-canvas-scale', String(getCanvasScale()));
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      root.style.removeProperty('--lp-career-canvas-scale');
    };
  }, []);

  return null;
}
