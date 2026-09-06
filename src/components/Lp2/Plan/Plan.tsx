'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_PLANS } from '@/constants/lp2Plans';

import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';

import styles from './Plan.module.css';

// PRICING(docs/spec/lp2-sections/11-plan.md)。
// PC はカードを 3 枚並べ、中央の FullSupport だけ一回り大きく「おすすめ」が付く。
// SP はカンプどおりタブで 1 プランずつ切り替える(既定は FullSupport)。

export default function Plan() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className={styles.Plan} id="plan">
      <SectionBg
        name="plan"
        pcWidth={1440}
        pcHeight={865}
        spWidth={750}
        spHeight={1525}
      />

      <div className={styles.Plan__Inner}>
        <p className={styles.Plan__Label}>PRICING</p>
        {/* PSD: 大きな「3」が左、その右上に「選べる」、右下に「つのプラン」。
            配置は grid-template-areas で決めているため、DOM は読み上げ順
            (「選べる 3 つのプラン」)を優先して並べる */}
        <h2 className={styles.Plan__Title}>
          <span className={styles.Plan__TitleSmall}>選べる</span>
          <span className={styles.Plan__TitleNumber}>3</span>
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

        {/* SP だけのタブ。PC ではカードを 3 枚並べるので出さない。
            role="tablist" の直下に許されるのは role="tab" だけなので、
            リストの意匠は活かしつつ li には role="presentation" を付ける */}
        <ul className={styles.Plan__Tabs} role="tablist" aria-label="料金プラン">
          {LP2_PLANS.map((plan, i) => (
            <li key={plan.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`lp2-plan-tab-${plan.id}`}
                aria-selected={i === activeIndex}
                aria-controls={`lp2-plan-panel-${plan.id}`}
                className={`${styles.Plan__Tab} ${i === activeIndex ? styles.isActive : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                {plan.recommended && (
                  <span className={styles.Plan__TabStars} aria-hidden="true">
                    ★★★★★
                  </span>
                )}
                {plan.tab.split('\n').map((line, j) => (
                  <span key={line}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </button>
            </li>
          ))}
        </ul>

        {/* タブの中身なので ul/li ではなく div。li に role="tabpanel" は付けられない */}
        <div className={styles.Plan__Cards}>
          {LP2_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              id={`lp2-plan-panel-${plan.id}`}
              role="tabpanel"
              aria-labelledby={`lp2-plan-tab-${plan.id}`}
              className={`${styles.Plan__Card} ${plan.recommended ? styles.isRecommended : ''} ${
                i === activeIndex ? styles.isActive : ''
              }`}
            >
              {/* カードの枠・グラデーションはカンプの意匠をそのまま使う */}
              <Image
                className={styles.Plan__CardBg}
                src={lp2Asset(`/images/lp-2/${plan.chrome}.webp`)}
                alt=""
                width={plan.recommended ? 374 : 339}
                height={plan.recommended ? 530 : 434}
                sizes="(min-width: 768px) 374px, 86vw"
                quality={LP2_IMAGE_QUALITY}
              />

              {/* 星は意匠画像に含まれるため描かない */}
              <h3 className={styles.Plan__Name}>{plan.name}</h3>
              {plan.recommended && <p className={styles.Plan__Badge}>おすすめ</p>}
              <p className={styles.Plan__Lead}>{plan.lead}</p>

              <p className={styles.Plan__Price}>
                {plan.listPrice && <del>{plan.listPrice}</del>}
                <span className={styles.Plan__After}>{plan.afterLabel}</span>
              </p>
              <p className={styles.Plan__AfterPrice}>{plan.afterPrice}</p>

              {plan.monthlyLabel && <p className={styles.Plan__MonthlyLabel}>{plan.monthlyLabel}</p>}
              {plan.monthly && (
                <p className={styles.Plan__Monthly}>
                  {plan.monthly}
                  {plan.monthlyTax && (
                    <span className={styles.Plan__MonthlyTax}>{plan.monthlyTax}</span>
                  )}
                </p>
              )}

              <CtaButton size="pc" className={styles.Plan__Cta} />
            </div>
          ))}
        </div>

        <p className={styles.Plan__Note}>
          ※ 月々の支払金額は24回分割の場合の参考額。
          <br />
          ご利用のクレジットカード会社所定の分割手数料が別途発生し、実際の月々お支払額・回数はカード会社の規定に準じます。
        </p>
      </div>
    </section>
  );
}
