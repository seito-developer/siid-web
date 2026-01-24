import Link from 'next/link';

import ReskillBanner from '../../ReskillBanner/ReskillBanner';

import ReskillBannerPc from './ReskillBannerPc/ReskillBannerPc';
import styles from './ReskillBannerSection.module.css';

export default function ReskillBannerSection() {
  return (
    <Link href="https://www.meti.go.jp/policy/economy/jinzai/reskillprograms/index.html" target="_blank" rel="noopener noreferrer" className={styles.ReskillBannerSection}>
      <div className={styles.ReskillBannerSection__BannerPc}>
        <ReskillBannerPc />
      </div>
      <div className={styles.ReskillBannerSection__BannerSp}>
        <ReskillBanner />
      </div>
    </Link>
  );
}
