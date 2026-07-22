import Image from 'next/image';
import Link from 'next/link';

import styles from './BookCard.module.css';

type BookCardProps = {
  title: string;
  publisher: string;
  date: string;
  imageUrl: string;
  link: string;
  width: number;
  height: number;
};

export default function BookCard({ title, publisher, date, imageUrl, link, width, height }: BookCardProps) {
  return (
    <div className={styles.BookCard}>
      <div className={styles.BookCard__Info}>
        <div className={styles.BookCard__InfoContent}>
          <h4 className={styles.BookCard__Title}>{title}</h4>
          <p className={styles.BookCard__Publisher}>{publisher}</p>
          <p className={styles.BookCard__Date}>{date}</p>
        </div>
        <Link href={link} className={styles.BookCard__Link} target="_blank" rel="noopener noreferrer">
          もっと見る
        </Link>
      </div>
      <Image src={imageUrl} alt={`書籍${title.replace(/\n/g, '')}の表紙`} width={width} height={height} className={styles.BookCard__Image} />
    </div>
  );
}
