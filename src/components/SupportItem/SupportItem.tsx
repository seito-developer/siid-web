import Image from 'next/image';

import styles from './SupportItem.module.css';

interface SupportItemProps {
  number: number;
  title: string;
  description: string;
  image?: string;
}

export default function SupportItem({ number, title, description, image }: SupportItemProps) {
  return (
    <li className={styles.SupportItem}>
      {image && (
        <div className={styles.SupportItem__ImageWrapper}>
          <Image src={image} alt="" width={468} height={298} className={styles.SupportItem__Image} />
          <div className={styles.SupportItem__Number}>{String(number).padStart(2, '0')}</div>
        </div>
      )}
      <h3 className={styles.SupportItem__Title}>{title}</h3>
      <p className={styles.SupportItem__Description}>{description}</p>
    </li>
  );
}
