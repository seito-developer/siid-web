import useIsPc from '@/hooks/useIsPc';


import ReskillBanner from '../../ReskillBanner/ReskillBanner';

import ReskillBannerPc from './ReskillBannerPc/ReskillBannerPc';
import styles from './ReskillBannerSection.module.css';

export default function ReskillBannerSection() {
  const isPc = useIsPc();

  return (
    <a href="" target="_blank" rel="noopener noreferrer" className={styles.ReskillBannerSection}>
      {isPc && <ReskillBannerPc />}
      {!isPc && <ReskillBanner />}
    </a>
  );
}
