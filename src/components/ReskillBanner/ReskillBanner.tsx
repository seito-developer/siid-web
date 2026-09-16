import React from 'react';

import styles from './ReskillBanner.module.css';

export default function ReskillBanner() {
  return (
    <aside className={styles.ReskillBanner}>
      {/* next/image の最適化を通らないため WebP を直接指定する(Issue #85)。
          変換元は assets/images-src/、生成は scripts/images/to-webp.sh。 */}
      <picture>
        <source media="(min-width: 1280px)" srcSet="/siid/reskill-banner-pc.webp" />
        <source media="(max-width: 1279px)" srcSet="/siid/reskill-banner-sp.webp" />
        <img
          src="/siid/reskill-banner-sp.webp"
          alt="Reスキル講座 - 給付金制度を利用して受講料最大80%オフ！"
          width="100%"
          height="auto"
        />
      </picture>
    </aside>
  );
}
