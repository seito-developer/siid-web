import styles from './SectionLabel.module.css';

// 各セクション頭の英字ラベル(RESULTS / VOICE / FAQ 等)。
// 両端に「線 + 丸」の飾りが付く(PSD: line グループ = 長方形 701 + 楕円形 4 × 2)。
// FuturaPT Heavy Oblique の代替として Jost を斜体で使う(§6)。

type Props = {
  children: string;
  /** 濃い背景に置く場合は true */
  inverse?: boolean;
  className?: string;
};

export default function SectionLabel({ children, inverse, className = '' }: Props) {
  return (
    <div className={`${styles.SectionLabel} ${inverse ? styles.isInverse : ''} ${className}`}>
      <span className={styles.SectionLabel__Line} aria-hidden="true" />
      <span className={styles.SectionLabel__Text}>{children}</span>
      <span className={styles.SectionLabel__Line} aria-hidden="true" />
    </div>
  );
}
