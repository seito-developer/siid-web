import { COURSE_FEATURE_LABELS, type Course } from '@/constants/courseData';

import styles from './CourseCard.module.css';
import RecommendBadge from './RecommendBadge/RecommendBadge';

type CourseCardProps = Course;

export default function CourseCard({ type, title, recommend, price, features }: CourseCardProps) {
  return (
    <div className={`${styles.CourseCard} ${styles[`CourseCard--${type}`]}`}>
      {recommend && (
        <div className={styles.CourseCard__Badge}>
          <RecommendBadge />
        </div>
      )}

      <div className={styles.CourseCard__Body}>
        <div className={styles.CourseCard__Header}>
          <h3 className={styles.CourseCard__Title}>{title}</h3>
        </div>

        <div className={styles.CourseCard__Content}>
          <div className={styles.CourseCard__Price}>
            <span className={styles.CourseCard__PriceAmount}>{price}</span>
            <span className={styles.CourseCard__PriceUnit}>円(税込)</span>
            <span className={styles.CourseCard__PriceFrom}>～</span>
          </div>

          <ul className={styles.CourseCard__Features}>
            {Object.entries(COURSE_FEATURE_LABELS).map(([key, label]) => {
              const value = features[key as keyof typeof features];
              if (!value) {
                return null;
              }
              return (
                <li key={key} className={styles.CourseCard__Feature}>
                  <span className={styles.CourseCard__FeatureLabel}>{label}</span>
                  <span className={styles.CourseCard__FeatureValue}>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
