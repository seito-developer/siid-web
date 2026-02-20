import styles from './Ribbon.module.css';

type RibbonTextProps = {
  text: string;
  durationSec?: number;
  direction?: 'left' | 'right';
  variant?: 'default' | 'voice';
};

export default function RibbonText({
  text,
  durationSec = 60,
  direction = 'left',
  variant = 'default',
}: RibbonTextProps) {

  const items = Array(20).fill(null).map((_, index) => (
    <span key={index} className={styles.RibbonWrap}>
      <span className={styles.RibbonText}>{text}</span>
    </span>
  ));

  return (
    <div className={`${styles.MarqueeContainer} ${variant === 'voice' ? styles.voice : styles.default}`}>
      <div
        className={styles.RibbonContent}
        data-direction={direction}
        style={{ ['--duration' as any]: `${durationSec}s` }}
      >
        <span className={styles.RibbonInner}>{items}</span>
        <span className={styles.RibbonInner} aria-hidden="true">{items}</span>
      </div>
    </div>
  );
}
