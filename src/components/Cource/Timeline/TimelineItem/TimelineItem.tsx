import Image from 'next/image';

import styles from './TimelineItem.module.css';

type TimelineItemProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  index: number;
};

export default function TimelineItem({ index, title, subtitle, description, image }: TimelineItemProps) {
  return (
    <div className={`${styles.TimelineItem} ${styles[`TimelineItem--${index}`]}`}>
      <div className={styles.TimelineItem__Image}>
        <Image src={image} alt={`${title}のイメージ`} width={400} height={300} />
      </div>
      <h4 className={styles.TimelineItem__Title}>
        <span className={styles.TimelineItem__TitleLabel}>{title}</span>
        <svg width="14" height="14" fill="none">
          <use href="#StarBlue" />
        </svg>
      </h4>
      <p className={styles.TimelineItem__Subtitle}>{subtitle}</p>
      <p className={styles.TimelineItem__Description}>{description}</p>
    </div>
  );
}
