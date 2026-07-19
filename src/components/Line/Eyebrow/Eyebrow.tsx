import React from 'react';

import styles from './Eyebrow.module.css';

type Props = {
  label: string;
  variant?: 'dark' | 'light';
};

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <svg
      className={`${styles.Eyebrow__Icon} ${flip ? styles['Eyebrow__Icon--right'] : ''}`}
      viewBox="0 0 9.24 12.57"
      fill="none"
      aria-hidden="true">
      <path
        d="M8.62 0.79 1.62 6.29 8.62 11.79"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Eyebrow({ label, variant = 'dark' }: Props) {
  return (
    <span
      className={`${styles.Eyebrow} ${variant === 'light' ? styles['Eyebrow--light'] : ''}`}>
      <Chevron />
      <span className={styles.Eyebrow__Slash}>/</span>
      <span className={styles.Eyebrow__Label}>{label}</span>
      <Chevron flip />
    </span>
  );
}
