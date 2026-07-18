import React from 'react';

import styles from './SectionHeading.module.css';

type Props = {
  en: string;
  title: string;
  invert?: boolean;
};

// 「</ Course >」風の英語ラベル + 見出しのセクション共通ヘッダ
export default function SectionHeading({ en, title, invert }: Props) {
  return (
    <div className={`${styles.SectionHeading} ${invert ? styles.isInvert : ''}`}>
      <span className={styles.SectionHeading__En}>{`</ ${en} >`}</span>
      <h2 className={styles.SectionHeading__Title}>{title}</h2>
    </div>
  );
}
