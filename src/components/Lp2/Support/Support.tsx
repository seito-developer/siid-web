import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Support.module.css';

// RESKILLING SUPPORT(docs/spec/lp2-sections/10-support.md)。
// 給付金の説明。通常価格 → 給付金適用 → 実質負担 の 3 ブロック。

export default function Support() {
  return (
    <section className={styles.Support} id="support">
      <SectionBg
        name="support"
        pcWidth={1440}
        pcHeight={815}
        spWidth={750}
        spHeight={1646}
      />

      <div className={styles.Support__Inner}>
        <SectionLabel inverse className={styles.Support__Label}>
          RESKILLING SUPPORT
        </SectionLabel>

        <h2 className={styles.Support__Title}>
          <span className={styles.Support__TitleSmall}>その学び</span>
          <span className={styles.Support__TitleLarge}>
            国が最大<em>80%</em>負担します
          </span>
        </h2>

        {/* 帯や矢印の意匠はカンプの書き出しを敷き、文字だけを重ねる */}
        <div className={styles.Support__Prices}>
          <div className={styles.Support__PriceBox}>
            <Image
              className={styles.Support__PriceBg}
              src={lp2Asset('/images/lp-2/support-price-normal.webp')}
              alt=""
              width={298}
              height={154}
              sizes="(min-width: 768px) 298px, 42vw"
              quality={LP2_IMAGE_QUALITY}
            />
            <p className={styles.Support__PriceLabel}>通常価格</p>
            <p className={styles.Support__PriceValue}>528,000円</p>
          </div>

          <div className={`${styles.Support__PriceBox} ${styles.isAfter}`}>
            <Image
              className={styles.Support__PriceBg}
              src={lp2Asset('/images/lp-2/support-price-after.webp')}
              alt=""
              width={676}
              height={191}
              sizes="(min-width: 768px) 676px, 92vw"
              quality={LP2_IMAGE_QUALITY}
            />
            <p className={`${styles.Support__PriceLabel} ${styles.isLeft}`}>給付金適用</p>
            <p className={`${styles.Support__PriceLabel} ${styles.isRight}`}>実質負担</p>
            <p className={`${styles.Support__PriceValue} ${styles.isAccent} ${styles.isLeft}`}>最大80%</p>
            <p className={`${styles.Support__PriceValue} ${styles.isAccent} ${styles.isRight}`}>
              105,600円～
            </p>
          </div>
        </div>

        <div className={styles.Support__Badge}>
          <Image
            className={styles.Support__BadgeFrame}
            src={lp2Asset('/images/lp-2/support-badge.webp')}
            alt=""
            width={713}
            height={129}
            sizes="(min-width: 768px) 713px, 92vw"
            quality={LP2_IMAGE_QUALITY}
          />
          <p className={styles.Support__BadgeMinistry}>経済産業省</p>
          <p className={styles.Support__BadgeCourse}>
            <span>第四次産業革命スキル習得講座</span>
            <strong>認定</strong>
          </p>
        </div>

        <p className={styles.Support__Note}>申請手続きもSiiDがサポートします。</p>
        <p className={styles.Support__Small}>
          ※Career 12ヶ月プラン対象。給付には所定の要件があります。
          <br />
          最新条件は無料相談でご案内します。
        </p>

        <CtaButton
          size="pc"
          label="給付金が使えるか"
          sub="無料で相談する"
          className={styles.Support__Cta}
        />
      </div>
    </section>
  );
}
