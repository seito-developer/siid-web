import Image from 'next/image';

import styles from './Tab.module.css';

export default function Tab() {
  return (
    <nav className={styles.Tab}>
      <a className={`${styles.Tab__Item} ${styles.Tab__Online}`} href="#online">
        オンライン
        <img
          src="/images/community/tab-arrow.svg"
          alt=""
          className={styles.Tab__ArrowDown}
        />
      </a>
      <a className={`${styles.Tab__Item} ${styles.Tab__Offline}`} href="#offline">
        オフライン
        <img
          src="/images/community/tab-arrow.svg"
          alt=""
          className={styles.Tab__ArrowDown}
        />
      </a>
    </nav>
  );
}