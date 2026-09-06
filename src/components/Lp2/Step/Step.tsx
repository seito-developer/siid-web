import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_STEPS } from '@/constants/lp2Steps';

import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';

import styles from './Step.module.css';

// 内定までの 5STEP(docs/spec/lp2-sections/08-step.md)。
// カードを縦に並べ、間に下向きの三角を置く。

export default function Step() {
  return (
    <section className={styles.Step} id="step">
      <SectionBg
        name="step"
        pcWidth={1440}
        pcHeight={2242}
        spWidth={750}
        spHeight={4620}
      />

      <div className={styles.Step__Inner}>
        <h2 className={styles.Step__Title}>
          <span className={styles.Step__TitleSmall}>内定までの</span>
          <span className={styles.Step__TitleLarge}>5STEP</span>
        </h2>

        <ol className={styles.Step__List}>
          {LP2_STEPS.map((step) => (
            <li key={step.no} className={styles.Step__Item}>
              {/* 番号バッジ・黄色い帯・イラストはカンプの意匠をそのまま敷き、
                  文字だけを実テキストで重ねる */}
              <Image
                className={styles.Step__CardBg}
                src={lp2Asset(`/images/lp-2/step-card-${step.no}.webp`)}
                alt=""
                width={803}
                height={380}
                sizes="(min-width: 768px) 803px, 100vw"
                quality={LP2_IMAGE_QUALITY}
              />

              <p className={styles.Step__Badge}>
                <span>STEP</span>
                <strong>{step.no}</strong>
              </p>

              <h3 className={styles.Step__CardTitle}>{step.title}</h3>
              <p className={styles.Step__Text}>
                {step.body.split('\n').map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>

        <CtaButton size="pc" className={styles.Step__Cta} />
      </div>
    </section>
  );
}
