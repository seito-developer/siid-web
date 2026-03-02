import FeaturesList from '@/components/FeaturesList/FeaturesList';

import styles from './Features.module.css';

export default function Features() {
  return (
    <div className={styles.Features}>
      <div className={styles.Features__HeadingContainer}>
        <div className={styles.Features__Title}>{'</ Features >'}</div>
        <h2 className={styles.Features__Heading}>サービスの４つの特徴</h2>
      </div>
      <FeaturesList />
    </div>
  );
}
