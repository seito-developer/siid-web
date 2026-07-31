import Image from 'next/image';

import styles from './Tab.module.css';

export default function Tab() {
  return (
    <nav className={styles.Tab}>
      <a className={`${styles.Tab__Item} ${styles.Tab__Online}`} href="#online">
        オンライン
        <Image
          src="/siid/images/community/tab-arrow.svg"
          alt=""
          width={12}
          height={8}
          className={styles.Tab__ArrowDown}
        />
      </a>
      <a className={`${styles.Tab__Item} ${styles.Tab__Offline}`} href="#offline">
        オフライン
        <Image
          src="/siid/images/community/tab-arrow.svg"
          alt=""
          width={12}
          height={8}
          className={styles.Tab__ArrowDown}
        />
      </a>
    </nav>
  );
}
