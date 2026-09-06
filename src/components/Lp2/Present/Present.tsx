import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_GIFTS } from '@/constants/lp2Gifts';

import CtaButton from '../CtaButton/CtaButton';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Present.module.css';

// FREE GIFTS(docs/spec/lp2-sections/15-present.md)。
//
// 書影のレイアウトと背景の紙吹雪は 1 枚の画像にまとめ、
// GIFT ラベルと見出しは実テキストで重ねる(文字を焼き込まない方針)。

export default function Present() {
  return (
    <section className={styles.Present} id="present">
      <Image
        className={styles.Present__Bg}
        src={lp2Asset('/images/lp-2/present-bg.webp')}
        alt=""
        width={1440}
        height={1083}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.Present__Inner}>
        <p className={styles.Present__Ribbon}>
          限定
          <br />
          配布
        </p>

        <SectionLabel inverse className={styles.Present__Label}>
          FREE GIFTS
        </SectionLabel>

        <h2 className={styles.Present__Title}>
          <span className={styles.Present__TitleSmall}>
            無料カウンセリング
            <br />
            参加者限定
          </span>
          <span className={styles.Present__TitleLarge}>7大特典をプレゼント</span>
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
