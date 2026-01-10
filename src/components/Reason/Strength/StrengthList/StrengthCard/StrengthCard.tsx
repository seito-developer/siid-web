import styles from './StrengthCard.module.css';
import Thumbnail from './Thumbnails/Thumbnail';

interface StrengthCardProps {
  icon: 'chart' | 'gear' | 'chat' | 'app' | 'goal' | 'community';
  title: string;
  items: string[];
}

export default function StrengthCard({ icon, title, items }: StrengthCardProps) {
  return (
    <div className={styles.StrengthCard}>
      <div className={styles.StrengthCard__Thumbnails}>
        <Thumbnail type={icon} />
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
