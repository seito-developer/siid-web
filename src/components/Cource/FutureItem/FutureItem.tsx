import styles from './FutureItem.module.css';

type FutureItemProps = {
  number: string;
  text: string;
  subText?: string;
};

export default function FutureItem({ number, text, subText }: FutureItemProps) {
  return (
    <li className={styles.FutureItem}>
      <div className={styles.FutureItem__Number}>
        <span className={styles.FutureItem__NumberLabel}>Future</span>
        <span className={styles.FutureItem__NumberNumber}>{number}</span>
      </div>
      <p className={styles.FutureItem__Text}>
        {text}
        {subText && (
          <>
            <br />
            <span className={styles.FutureItem__SubText}>{subText}</span>
          </>
        )}
      </p>
    </li>
  );
}
