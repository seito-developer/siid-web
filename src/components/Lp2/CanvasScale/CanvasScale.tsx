'use client';

import { useEffect } from 'react';

/** CSS の長さ同士の除算に未対応のブラウザだけ、同じ縮尺を数値で補う。 */
export default function CanvasScale() {
  useEffect(() => {
    if (CSS.supports('zoom', 'calc(100vw / 375px)')) {return;}

    const root = document.querySelector<HTMLElement>('.lp2');
    if (!root) {return;}

    function updateScale() {
      // visualViewport.width はピンチ操作で変わるため使用しない。
      const viewportWidth = window.innerWidth;
      const scale = viewportWidth < 768 ? viewportWidth / 375 : Math.min(1, viewportWidth / 1440);
      root?.style.setProperty('--lp2-canvas-scale', String(scale));
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      root.style.removeProperty('--lp2-canvas-scale');
    };
  }, []);

  return null;
}
