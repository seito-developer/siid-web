import React from 'react';

import { LOGO_PATHS } from '@/components/Logo/Logo';

// オープニング演出専用の SiiD ロゴ。
// stroke: 線画（GSAP のドローオン対象）/ fill: 塗り（クリップワイプで出現）
export default function OpeningLogo({ variant }: { variant: 'stroke' | 'fill' }) {
  const isStroke = variant === 'stroke';
  return (
    <svg
      width="69"
      height="18"
      viewBox="0 0 69 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {LOGO_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={isStroke ? 'none' : '#ffffff'}
          stroke={isStroke ? '#ffffff' : 'none'}
          strokeWidth={isStroke ? 0.6 : 0}
        />
      ))}
    </svg>
  );
}
