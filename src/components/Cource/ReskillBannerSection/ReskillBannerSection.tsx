import Image from 'next/image';
import Link from 'next/link';

import ReskillBanner from '../../ReskillBanner/ReskillBanner';

import styles from './ReskillBannerSection.module.css';

export default function ReskillBannerSection() {
  return (
    <Link href="https://www.meti.go.jp/policy/economy/jinzai/reskillprograms/index.html" target="_blank" rel="noopener noreferrer" className={styles.ReskillBannerSection}>
      <div className={styles.ReskillBannerSection__BannerPc}>
        <Image src="/siid/reskill-banner-pc-wide.png" alt="Reスキル講座 給付金制度を利用して受講料最大80%オフ! Careerコース（12ヶ月プラン）は経済産業省の第四次産業革命スキル習得講座（通称:リスキル講座）に認定されています。詳細はこちら" width={2374} height={808} className={styles.ReskillBannerSection__BannerPcImage} />
      </div>
      <div className={styles.ReskillBannerSection__BannerSp}>
        <ReskillBanner />
      </div>
    </Link>
  );
}
