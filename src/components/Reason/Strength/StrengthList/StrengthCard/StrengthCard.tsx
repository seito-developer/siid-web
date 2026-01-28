import styles from './StrengthCard.module.css';

interface StrengthCardProps {
  icon: 'chart' | 'gear' | 'chat' | 'app' | 'goal' | 'community';
  title: string;
  items: string[];
}

export default function StrengthCard({ icon, title, items }: StrengthCardProps) {
  const videoSrc = `/images/reason/strength/strengthlist/strengthcard/${icon}.mp4`;

  return (
    <div className={styles.StrengthCard}>
      <div className={styles.StrengthCard__Thumbnails}>
        <video width="100%" height="auto" muted autoPlay loop preload="none">
          <source src={videoSrc} type="video/mp4" />
        </video>
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
