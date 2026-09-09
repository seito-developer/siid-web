import styles from './CtaButton.module.css';

// 全セクションで使い回す CTA ボタン(docs/spec/lp2-sections/02-fv.notes.md)。
// 意匠(緑の角丸・枠・内側の白線・両脇の二重三角)はカンプから書き出した画像で、
// 文字だけをテキストとして重ねる。CSS で組んだときは色と枠の太さ、矢印の形が
// カンプに寄せきれなかった。

// PSD 実測のサイズ。header = PC ヘッダー内、sp = SP の本文中、pc = PC の本文中。
type Size = 'header' | 'sp' | 'pc';

type Props = {
  /** 1 行目。2 行目は children ではなく sub で受ける(PSD が 2 行のテキストレイヤーのため) */
  href?: string;
  label?: string;
  sub?: string;
  size?: Size;
  className?: string;
};


export default function CtaButton({
  href = '#counselling',
  label = '無料カウンセリングを',
  sub = '予約する',
  size = 'header',
  className = '',
}: Props) {
  return (
    <a
      href={href}
      className={`${styles.CtaButton} ${styles[`is_${size}`]} ${className}`}
    >
      {/* 緑の枠・内側の白線・両脇の二重三角は背景画像に含まれる */}
      <span className={styles.CtaButton__Label}>
        {label}
        <br />
        {sub}
      </span>
    </a>
  );
}
