import Image from 'next/image';

import styles from './CommunityTabs.module.css';

export default function CommunityTabs() {
  return (
    <nav className={styles.tabs}>
      <a className={`${styles.tabItem} ${styles.online}`} href="#online">
        オンライン
        <img
          src="/images/community/tab-arrow.svg"
          alt=""
          className={styles.arrowDown}
        />
      </a>
      <a className={`${styles.tabItem} ${styles.offline}`} href="#offline">
        オフライン
        <img
          src="/images/community/tab-arrow.svg"
          alt=""
          className={styles.arrowDown}
        />
      </a>
    </nav>
  );
}