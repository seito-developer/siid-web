import { LP2_GIFTS } from '@/constants/lp2Gifts';

import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Present.module.css';

// FREE GIFTS(docs/spec/lp2-sections/15-present.md)。
//
// 書影のレイアウトと背景の紙吹雪は 1 枚の画像にまとめ、
// GIFT ラベルと見出しは実テキストで重ねる(文字を焼き込まない方針)。

export default function Present() {
  return (
    <section className={styles.Present} id="present">
      <SectionBg
        name="present"
        pcWidth={1440}
        pcHeight={1083}
        spWidth={750}
        spHeight={3176}
      />

      <div className={styles.Present__Inner}>
        <p className={styles.Present__Ribbon}>
          限定
          <br />
          配布
        </p>

        <SectionLabel gradient className={styles.Present__Label}>
          FREE GIFTS
        </SectionLabel>

        <h2 className={styles.Present__Title}>
          <span className={styles.Present__TitleSmall}>
            無料カウンセリング
            <br />
            参加者限定
          </span>
          <span className={styles.Present__TitleLarge}>
            <span className={styles.Present__TitleNum}>7</span>大特典をプレゼント
          </span>
        </h2>

        <ul className={styles.Present__Gifts}>
          {LP2_GIFTS.map((gift) => (
            <li key={gift.no} className={styles.Present__Gift}>
              <p className={styles.Present__GiftNo}>{gift.no}</p>
              <p className={styles.Present__GiftTitle}>
                {gift.title.split('\n').map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              <p className={styles.Present__GiftHighlight}>
                {gift.highlight.split('\n').map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <CtaButton size="pc" className={styles.Present__Cta} />
      </div>
    </section>
  );
}
