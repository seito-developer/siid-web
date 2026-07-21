import { useEffect } from "react";

import { getYouTubeEmbedUrl } from "@/utils/youtube";

import styles from "./CareerModal.module.css";

interface CareerModalProps {
  title: string;
  youtubeId: string;
  detailContent: string;
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
  onAnimationEnd: () => void;
  voice: string;
}

export default function CareerModal({
  isOpen,
  isClosing,
  onClose,
  onAnimationEnd,
  title,
  youtubeId,
  detailContent,
  voice,
}: CareerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
      className={`${styles.CareerModal__Overlay} ${
        isClosing ? styles["CareerModal__Overlay--closing"] : ""
      }`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.CareerModal__Container} ${
          isClosing ? styles["CareerModal__Container--closing"] : ""
        }`}
        onAnimationEnd={onAnimationEnd}
      >
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
            <div className={styles.CareerModal__HeaderTop}>
              <div className={styles.CareerModal__TitleWrapper}>
                <h3 className={styles.CareerModal__Title}>{title}</h3>
              </div>
            </div>

            <div className={styles.CareerModal__ImageSection}>
              <iframe
                src={getYouTubeEmbedUrl(youtubeId)}
                className={styles.CareerModal__Image}
                title="卒業生インタビュー動画"
                loading="lazy"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            <section className={styles.CareerModal__ResultSection}>
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
