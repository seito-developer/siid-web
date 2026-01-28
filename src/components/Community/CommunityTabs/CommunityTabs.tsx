
import styles from './CommunityTabs.module.css';

export default function CommunityTabs() {
  return (
    <nav className={styles.tabs}>
      <a className={`${styles.tab} ${styles.online}`} href="#online">
        オンライン
        <img
          src="/community/tab-arrow.svg"
          className={styles.arrowDown}
        />
      </a>
      <a className={`${styles.tab} ${styles.offline}`} href="#offline">
        オフライン
        <img
          src="/community/tab-arrow.svg"
          className={styles.arrowDown}
        />
      </a>
    </nav>
  );
}