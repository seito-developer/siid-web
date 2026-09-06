import styles from './SectionLabel.module.css';

// 各セクション頭の英字ラベル(RESULTS / VOICE / FAQ 等)。
// 両端に「線 + 丸」の飾りが付く(PSD: line グループ = 長方形 701 + 楕円形 4 × 2)。
// FuturaPT Heavy Oblique の代替として Jost を斜体で使う(§6)。

type Props = {
  children: string;
  /** 濃い背景に置く場合は true(白抜き) */
  inverse?: boolean;
  /**
   * 明るい背景に置く場合は true。
   * PSD のテキストレイヤーの色は #FFFFFF だが、上にクリップされたグラデーションが
   * 乗っており、実際は紫 → 水色で描画される(基準画像で確認)。
   */
  gradient?: boolean;
  className?: string;
};

export default function SectionLabel({ children, inverse, gradient, className = '' }: Props) {
  const variant = [inverse ? styles.isInverse : '', gradient ? styles.isGradient : ''].join(' ');

  return (
    <div className={`${styles.SectionLabel} ${variant} ${className}`}>
      <span className={styles.SectionLabel__Line} aria-hidden="true" />
      <span className={styles.SectionLabel__Text}>{children}</span>
      <span className={styles.SectionLabel__Line} aria-hidden="true" />
    </div>
  );
}
