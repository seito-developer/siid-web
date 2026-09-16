import styles from './FutureItem.module.css';

type FutureItemProps = {
  number: string;
  text: string;
};

export default function FutureItem({ number, text }: FutureItemProps) {
  return (
    <li className={styles.FutureItem}>
      <div className={styles.FutureItem__Number}>
        <span className={styles.FutureItem__NumberLabel}>Future</span>
        <span className={styles.FutureItem__NumberNumber}>{number}</span>
        <svg width="97" height="111" fill="none">
          <use href="#Hexagon" />
        </svg>
      </div>
      <p className={styles.FutureItem__Text}>{text}</p>
    </li>
  );
}
