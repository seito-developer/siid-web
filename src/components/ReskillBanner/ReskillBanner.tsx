import Link from 'next/link'
import React from 'react'
import styles from './ReskillBanner.module.css';

export default function ReskillBanner() {
  return (
    <Link className={styles.ReskillBanner} href="/reskill">
      <picture>
      <source
        media="(min-width: 1280px)"
        srcSet="/reskill-banner-pc.png"
      />
      <source
        media="(max-width: 1279px)"
        srcSet="/reskill-banner-sp.png"
      />
      <img
        src="/images/reskill-banner-sp.png"
        alt="Reスキル講座 - 給付金制度を利用して受講料最大80%オフ！"
        width="100%"
        height="auto"
      />
    </picture>
    </Link>
  )
}

