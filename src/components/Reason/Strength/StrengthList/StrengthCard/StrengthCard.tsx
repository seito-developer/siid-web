import Image from 'next/image';

import styles from './StrengthCard.module.css';

interface StrengthCardProps {
  icon: 'chart' | 'gear' | 'chat' | 'app' | 'goal' | 'community';
  title: string;
  items: string[];
}

export default function StrengthCard({ icon, title, items }: StrengthCardProps) {
  const animeSrc = `/images/reason/strength/strengthlist/strengthcard/${icon}.webp`;

  return (
    <div className={styles.StrengthCard}>
      <div className={styles.StrengthCard__Thumbnails}>
        <Image src={animeSrc} width={540} height={540} alt={'イメージ図' + title} />
      </div>
      <h3 className={styles.StrengthCard__Title}>{title}</h3>
      <ul className={styles.StrengthCard__List}>
        {items.map((item, index) => (
          <li key={index} className={styles.StrengthCard__Item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
