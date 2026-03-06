import React from 'react';

import TransitionLink from '@/components/TransitionLink/TransitionLink';

import styles from './ContactButton.module.css';

export default function ContactButton({ modifier }: { modifier?: string }) {
  return (
    <TransitionLink className={`${styles.ContactButton} ${modifier ? styles[modifier] : ''}`} href="/contact">
      <span className={styles.ContactButton__En}>{'\<\/ CONTACT \>'}</span>
      <span className={styles.ContactButton__Jp}>
            個別説明会へ<br />
            申し込む
      </span>
    </TransitionLink>
  );
}

