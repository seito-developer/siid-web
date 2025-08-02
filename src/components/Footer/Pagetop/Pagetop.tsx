'use client';

import React from 'react';

import styles from './Pagetop.module.css';

export default function Pagetop() {
  return (
    <button type="button" className={styles.Pagetop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span>page<br />top</span>
      <svg width="79" height="80" viewBox="0 0 79 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.6437 1.42008C39.0325 0.77528 39.9675 0.775278 40.3563 1.42008L54.4194 24.7407C54.5033 24.88 54.62 24.9967 54.7593 25.0806L78.0799 39.1437C78.7247 39.5325 78.7247 40.4675 78.0799 40.8563L54.7593 54.9194C54.62 55.0033 54.5033 55.12 54.4194 55.2593L40.3563 78.5799C39.9675 79.2247 39.0325 79.2247 38.6437 78.5799L24.5806 55.2593C24.4967 55.12 24.38 55.0033 24.2407 54.9194L0.920078 40.8563C0.27528 40.4675 0.275278 39.5325 0.920076 39.1437L24.2407 25.0806C24.38 24.9967 24.4967 24.88 24.5806 24.7407L38.6437 1.42008Z" fill="#567EB4"/>
      </svg>
    </button>
  );
}