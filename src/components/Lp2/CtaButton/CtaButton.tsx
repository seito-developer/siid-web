import styles from './CtaButton.module.css';

// 全セクションで使い回す CTA ボタン(docs/spec/lp2-sections/02-fv.notes.md)。
// 緑のグラデーション・両脇の二重三角・下の発光はすべて CSS / SVG で組む。
// PSD ではシェイプとスマートオブジェクトだが、画像にすると Retina で足りない。

// PSD 実測のサイズ。header = PC ヘッダー内、sp = SP の本文中、pc = PC の本文中。
type Size = 'header' | 'sp' | 'pc';

type Props = {
  /** 1 行目。2 行目は children ではなく sub で受ける(PSD が 2 行のテキストレイヤーのため) */
  label?: string;
  sub?: string;
  size?: Size;
  className?: string;
};

function Arrows({ flip }: { flip?: boolean }) {
  return (
    <span className={`${styles.Arrows} ${flip ? styles.isFlipped : ''}`} aria-hidden="true">
      {/* PSD 実測: 27x78(SP)/ 22x59(PC)の縦長の二重シェブロン */}
      <svg viewBox="0 0 27 78" width="27" height="78" focusable="false">
        <polygon points="16,0 27,39 16,78" fill="currentColor" />
        <polygon points="0,10 9,39 0,68" fill="currentColor" opacity="0.85" />
      </svg>
    </span>
  );
}

export default function CtaButton({
  label = '無料カウンセリングを',
  sub = '予約する',
  size = 'header',
  className = '',
}: Props) {
  return (
    <a
      href="#counselling"
      className={`${styles.CtaButton} ${styles[`is_${size}`]} ${className}`}
    >
      {/* カンプでは左右の矢印がどちらも内側(文字のほう)を向く */}
      <Arrows />
      <span className={styles.CtaButton__Label}>
        {label}
        <br />
        {sub}
      </span>
      <Arrows flip />
    </a>
  );
}
