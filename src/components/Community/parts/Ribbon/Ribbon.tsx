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
    <span key={index} className={styles.Ribbon__Wrapper}>
      <span className={styles.Ribbon__Text}>{text}</span>
    </span>
  ));

  return (
    <div className={`${styles.Ribbon__MarqueeContainer} ${variant === 'voice' ? styles.voice : styles.default}`}>
      <div
        className={styles.Ribbon__Content}
        data-direction={direction}
        style={{ ['--duration' as any]: `${durationSec}s` }}
      >
        <span className={styles.Ribbon__Inner}>{items}</span>
        <span className={styles.Ribbon__Inner} aria-hidden="true">{items}</span>
      </div>
    </div>
  );
}
