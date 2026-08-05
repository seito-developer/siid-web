import React from 'react';

import Link from 'next/link';

import { pages } from '@/constants/meta';

import styles from './LineBanner.module.css';

export default function LineBanner() {
  return (
    <Link href={pages.line.url} className={styles.LineBanner}>
      <div className={styles.LineBanner__Head}>
        <span className={styles.LineBanner__Logo}>LINE</span>
        <p className={styles.LineBanner__Copy}>登録すると限定特典がもらえる</p>
      </div>
      <div className={styles.LineBanner__Code}>
        <pre>
          {'<div '}
          <span className={styles.LineBanner__CodePink}>class</span>
          {'="💡">\n'}
          {'  <p>\n'}
          {'     未経験からエンジニアになるには？<br>\n'}
          {'     その最初の一歩が、LINEからはじまる。<br>\n'}
          {'     登録するだけで、<br>\n'}
          {'     学習のヒントや限定講座が届くらしい！？\n'}
          {'  </p>\n'}
          {'</div>'}
        </pre>
      </div>
      <div className={styles.LineBanner__Button}>
        <span className={styles.LineBanner__ButtonTag}>{'<button>'}</span>
        <span className={styles.LineBanner__ButtonText}>詳細はこちら</span>
        <span className={styles.LineBanner__ButtonTag}>{'</button>'}</span>
      </div>
    </Link>
  );
}
