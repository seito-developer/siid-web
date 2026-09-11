import Image from 'next/image';
import Link from 'next/link';

import type { InterviewCard } from '@/types/interview';
import { formatPublishedDate } from '@/utils/date';

import styles from './CareerCard.module.css';

interface CareerCardProps {
  interview: InterviewCard;
  priority?: boolean;
}

// インタビュー記事（SiiD BLOG）へのカード。記事は別ドメインのため別タブで開く（Issue #75）。
export default function CareerCard({ interview, priority = false }: CareerCardProps) {
  const { url, title, publishedAt, eyecatchUrl, tags } = interview;
  const formattedDate = formatPublishedDate(publishedAt);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.CareerCard__Link}
    >
      <article className={styles.CareerCard}>
        <div className={styles.CareerCard__ImageWrapper}>
          {eyecatchUrl && (
            <Image
              src={eyecatchUrl}
              alt=""
              width={1280}
              height={720}
              sizes="(min-width: 1280px) 452px, 100vw"
              className={styles.CareerCard__Image}
              priority={priority}
            />
          )}
        </div>
        <div className={styles.CareerCard__Header}>
          {formattedDate && (
            <time className={styles.CareerCard__Date} dateTime={publishedAt}>
              {formattedDate}
            </time>
          )}
          <h3 className={styles.CareerCard__Title}>{title}</h3>
        </div>

        <span className={styles.CareerCard__Line}></span>

        <div className={styles.CareerCard__Footer}>
          <div className={styles.CareerCard__Tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.CareerCard__Tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.CareerCard__Button}>
            <svg
              className={styles.CareerCard__Icon}
              width="11"
              height="11"
              viewBox="0 0 11 11"
              aria-hidden="true"
            >
              <use href="#rightArrow" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
