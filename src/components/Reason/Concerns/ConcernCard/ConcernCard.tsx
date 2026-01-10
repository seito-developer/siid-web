import styles from './ConcernCard.module.css';

interface ConcernCardProps {
  number: string;
  title: string;
}

export default function ConcernCard({ number, title }: ConcernCardProps) {
  return (
    <div className={styles.ConcernCard}>
      <h4 className={styles.ConcernCard__Number}>
        <span className={styles.ConcernCard__Label}>PROBLEM</span>
        <span className={styles.ConcernCard__Digit}>{number}</span>
      </h4>
      <p className={styles.ConcernCard__Title}>{title}</p>
    </div>
  );
}

