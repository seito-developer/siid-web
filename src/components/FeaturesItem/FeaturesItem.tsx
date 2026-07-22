import Image from 'next/image';

import styles from './FeaturesItem.module.css';

interface FeaturesItemProps {
  image: string;
  title1: string;
  title2: string;
  description: string;
}

export default function FeaturesItem({ image, title1, title2, description }: FeaturesItemProps) {
  return (
    <li className={styles.FeaturesItem}>
      <div className={styles.FeaturesItem__ImageWrapper}>
        <Image src={image} alt={`${title1}${title2}のイメージ`} width={622} height={350} className={styles.FeaturesItem__Image} />
        <div className={styles.FeaturesItem__TitleWrapper}>
          <h3 className={styles.FeaturesItem__Title1}>{title1}</h3>
          <h3 className={styles.FeaturesItem__Title2}>{title2}</h3>
        </div>
      </div>
      <p className={styles.FeaturesItem__Description}>{description}</p>
    </li>
  );
}
