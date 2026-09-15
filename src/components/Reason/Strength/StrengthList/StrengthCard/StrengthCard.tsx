import Image from 'next/image';

import styles from './StrengthCard.module.css';

interface StrengthCardProps {
  icon: 'chart' | 'gear' | 'chat' | 'app' | 'goal' | 'community';
  title: string;
  items: string[];
}

export default function StrengthCard({ icon, title, items }: StrengthCardProps) {
  // アニメーション WebP。元は 1080px の APNG(6 枚で計 5.9MB)だったが、表示は PC 180px /
  // SP 100px のため 400px へ縮小して変換した(Issue #94、scripts/apng-to-webp.mjs)。
  // next/image はアニメーション画像を最適化せず素通しするため、元ファイルの大きさがそのまま配信される。
  const animeSrc = `/siid/images/reason/strength/strengthlist/strengthcard/${icon}.webp`;

  return (
    <div className={styles.StrengthCard}>
      <div className={styles.StrengthCard__Thumbnails}>
        <Image src={animeSrc} width={400} height={400} alt={'イメージ図' + title} />
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
