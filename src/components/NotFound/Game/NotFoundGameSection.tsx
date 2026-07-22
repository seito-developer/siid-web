'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import styles from './NotFoundGameSection.module.css';

const GameCanvas = dynamic(() => import('./GameCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function NotFoundGameSection() {
  return (
    <section
      className={styles.NotFoundGameSection}
      aria-label="404ミニゲーム"
    >
      <GameCanvas />
    </section>
  );
}
