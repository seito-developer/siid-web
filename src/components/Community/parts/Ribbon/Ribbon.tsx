import styles from './Ribbon.module.css';

type RibbonTextProps = {
  text: string;
};

export default function RibbonText({
  text,
}: RibbonTextProps) {
  const items = Array(20).fill(null).map((_, index) => (
    <span key={index} className={styles.RibbonWrap}>
      <span className={styles.RibbonText}>{text}</span>
    </span>
  ));

  return (
    <div className={styles.MarqueeContainer}>
      <div className={styles.RibbonContent}>
        <span className={styles.RibbonInner}>{items}</span>
        <span className={styles.RibbonInner}>{items}</span>
      </div>
    </div>
  );
}