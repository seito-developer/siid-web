import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_PLANS } from '@/constants/lp2Plans';

import CtaButton from '../CtaButton/CtaButton';

import styles from './Plan.module.css';

// PRICING(docs/spec/lp2-sections/11-plan.md)。
// 中央の FullSupport だけ一回り大きく、王冠と「おすすめ」バッジが付く。

export default function Plan() {
  return (
    <section className={styles.Plan} id="plan">
      <Image
        className={styles.Plan__Bg}
        src={lp2Asset('/images/lp-2/plan-bg.webp')}
        alt=""
        width={1440}
        height={865}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.Plan__Inner}>
        <p className={styles.Plan__Label}>PRICING</p>
        {/* PSD: 大きな「3」が左、その右上に「選べる」、右下に「つのプラン」 */}
        <h2 className={styles.Plan__Title}>
          <span className={styles.Plan__TitleNumber}>3</span>
          <span className={styles.Plan__TitleSmall}>選べる</span>
          <span className={styles.Plan__TitleLarge}>つのプラン</span>
        </h2>

        <Image
          className={styles.Plan__Instructor}
          src={lp2Asset('/images/lp-2/plan-instructor.webp')}
          alt=""
          width={179}
          height={358}
          quality={LP2_IMAGE_QUALITY}
        />

        <ul className={styles.Plan__Cards}>
          {LP2_PLANS.map((plan) => (
            <li
              key={plan.id}
              className={`${styles.Plan__Card} ${plan.recommended ? styles.isRecommended : ''}`}
            >
              {plan.recommended && (
                <>
                  <p className={styles.Plan__Stars} aria-hidden="true">
                    ★★★★★
                  </p>
                  <p className={styles.Plan__Badge}>おすすめ</p>
                </>
              )}

              <h3 className={styles.Plan__Name}>{plan.name}</h3>
              <p className={styles.Plan__Lead}>{plan.lead}</p>

              <p className={styles.Plan__Price}>
                {plan.listPrice && <del>{plan.listPrice}</del>}
                <span className={styles.Plan__After}>{plan.afterLabel}</span>
              </p>
              <p className={styles.Plan__AfterPrice}>{plan.afterPrice}</p>

              {plan.monthlyLabel && <p className={styles.Plan__MonthlyLabel}>{plan.monthlyLabel}</p>}
              {plan.monthly && <p className={styles.Plan__Monthly}>{plan.monthly}</p>}

              <CtaButton className={styles.Plan__Cta} />
            </li>
          ))}
        </ul>

        <p className={styles.Plan__Note}>
          ※ 月々の支払金額は24回分割の場合の参考額。
          <br />
          ご利用のクレジットカード会社所定の分割手数料が別途発生し、実際の月々お支払額・回数はカード会社の規定に準じます。
        </p>
      </div>
    </section>
  );
}
