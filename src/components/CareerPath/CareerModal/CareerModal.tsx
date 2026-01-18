import { useEffect } from 'react';


import { getYouTubeEmbedUrl } from '../../../utils/youtube';

import styles from './CareerModal.module.css';

interface CareerModalProps {
  title: string;
  age: number;
  sex: string;
  course: string;
  reason: string;
  description: string;
  youtubeId: string;
  detailTitle: string;
  achievement: string;
  detailContent: string;
  isOpen: boolean;
  onClose: () => void;
  voice: string;
}

export default function CareerModal({
  isOpen,
  onClose,
  title,
  age,
  sex,
  course,
  reason,
  description,
  youtubeId,
  detailTitle,
  achievement,
  detailContent,
  voice,
}: CareerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.CareerModal__Overlay}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={styles.CareerModal__Container}>
        <div className={styles.CareerModal__Badge}>
          <span className={styles.CareerModal__BadgeText}>･ CASE ･</span>
          <span className={styles.CareerModal__BadgeNumber}>{voice}</span>
        </div>

        <button
          className={styles.CareerModal__Close}
          onClick={onClose}
          type="button"
        >
          <span>✕</span>
          <span>閉じる</span>
        </button>

        <div className={styles.CareerModal__Content}>
          <article className={styles.CareerModal__Article}>
            <div className={styles.CareerModal__Top}>
              <header className={styles.CareerModal__Header}>
                <div className={styles.CareerModal__HeaderTop}>
                  <div className={styles.CareerModal__TitleWrapper}>
                    <h3 className={styles.CareerModal__Title}>{title}</h3>
                  </div>

                  <div className={styles.CareerModal__Block}>
                    <div className={styles.CareerModal__InfoWrapper}>
                      <div className={styles.CareerModal__InfoItem}>
                        <span className={styles.CareerModal__Label}>
                          {age}代 {sex}
                        </span>
                      </div>

                      <div className={styles.CareerModal__InfoItem}>
                        <span className={styles.CareerModal__Label}>
                          受講したコース：
                        </span>
                        <span className={styles.CareerModal__Course}>
                          {course}
                        </span>
                      </div>

                      <div className={styles.CareerModal__InfoItem}>
                        <span className={styles.CareerModal__Label}>
                          受講した目的：
                        </span>
                        <span className={styles.CareerModal__Text}>
                          {reason}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <span className={styles.CareerModal__Line}></span>

              <section className={styles.CareerModal__DescriptionSection}>
                <p className={styles.CareerModal__Description}>
                  {description}
                </p>
              </section>
            </div>

            <section className={styles.CareerModal__ImageSection}>
              <iframe
                src={getYouTubeEmbedUrl(youtubeId)}
                className={styles.CareerModal__Image}
                title="卒業生インタビュー動画"
                loading='lazy'
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </section>

            <section className={styles.CareerModal__ResultSection}>
              <h2 className={styles.CareerModal__ResultTitle}>
                {detailTitle}
              </h2>
              <h3 className={styles.CareerModal__ResultAchievement}>
                {achievement}
              </h3>
              <p className={styles.CareerModal__ResultContent}>
                {detailContent}
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}