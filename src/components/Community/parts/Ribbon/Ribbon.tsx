import styles from './Ribbon.module.css';

export default function RibbonText(props: { text: string; repeat?: number }) {
  const { text, repeat = 12 } = props;
  return (
    <div className={styles.ribbon} aria-hidden="true">
      <div className={styles.ribbonInner}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className={styles.ribbonWord}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}