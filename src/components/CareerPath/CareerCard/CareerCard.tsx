import Image from 'next/image';
import Link from 'next/link';


import styles from './CareerCard.module.css';

interface CareerCardProps{
  id: string;
  voice: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
  priority?: boolean;
}

export default function CareerCard({
  id,
  voice,
  title,
  thumbnailUrl,
  description,
  tags,
  priority = false,
}: CareerCardProps) {
  return (
    <article className={styles.CareerCard}>
      <Image
        src={thumbnailUrl}
        alt={title}
        width={452}
        height={254}
        className={styles.CareerCard__Image}
        priority={priority}
      />
      <div className={styles.CareerCard__Header}>
        <div className={styles.CareerCard__Voice}>
          <span className={styles.CareerCard__VoiceText}>Voice</span>
          <span className={styles.CareerCard__VoiceNum}>{voice}</span>
        </div>
        <h3 className={styles.CareerCard__Title}>{title}</h3>
      </div>

      <span className={styles.CareerCard__Line}></span>
      <p className={styles.CareerCard__Description}>{description}</p>

      <div className={styles.CareerCard__Footer}>
        <div className={styles.CareerCard__Tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.CareerCard__Tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`?id=${id}`}
          scroll={false}
          className={styles.CareerCard__Button}
        >
          <svg
            className={styles.CareerCard__Icon}
            width="11"
            height="11"
            viewBox="0 0 11 11"
          >
            <use href="#rightArrow" />
          </svg>
        </Link>
      </div>
    </article>
  );
}