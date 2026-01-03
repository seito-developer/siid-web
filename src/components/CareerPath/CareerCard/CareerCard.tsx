'use client';

import Image from 'next/image';

import type { CareerPathData } from '@/types/career';

import styles from './CareerCard.module.css';

interface CareerCardProps extends CareerPathData {
  onClick: () => void;
}

export default function CareerCard({
  voice,
  title,
  thumbnailUrl,
  description,
  tags,
  onClick,
}: CareerCardProps) {
  return (
    <article className={styles.CareerCard}>
      <Image
        src={thumbnailUrl}
        alt={title}
        width={452}
        height={254}
        className={styles.CareerCard__Image}
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
        <button
          className={styles.CareerCard__Button}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <svg
            className={styles.CareerCard__Icon}
            width="11"
            height="11"
            viewBox="0 0 11 11"
          >
            <use href="#rightArrow" />
          </svg>
        </button>
      </div>
    </article>
  );
}