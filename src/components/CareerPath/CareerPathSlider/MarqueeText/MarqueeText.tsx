import Logo from '@/components/Logo/Logo';

import styles from './MarqueeText.module.css';
import StarIcon from './StarIcon';

export default function MarqueeText() {
  // ロゴとアイコンを繰り返す
  const items = Array(20)
    .fill(null)
    .map((_, index) => (
      <span key={index} className={styles.MarqueeItem}>
        <Logo fill="#a75884" />
        <span className={styles.MarqueeText}>CAREER</span>
        <StarIcon />
      </span>
    ));

  return (
    <div className={styles.MarqueeContainer}>
      <div className={styles.MarqueeContent}>
        <span className={styles.MarqueeGroup}>{items}</span>
        <span className={styles.MarqueeGroup}>{items}</span>
      </div>
    </div>
  );
}
