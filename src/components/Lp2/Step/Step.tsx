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
              <p className={styles.Step__Badge}>
                <span>STEP</span>
                <strong>{step.no}</strong>
              </p>

              <div className={styles.Step__Card}>
                <h3 className={styles.Step__CardTitle}>{step.title}</h3>
                <div className={styles.Step__CardBody}>
                  <Image
                    className={styles.Step__Illust}
                    src={lp2Asset(`/images/lp-2/${step.image}.webp`)}
                    alt=""
                    width={step.imageWidth}
                    height={step.imageHeight}
                    sizes="(min-width: 768px) 356px, 45vw"
                    quality={LP2_IMAGE_QUALITY}
                  />
                  <p className={styles.Step__Text}>
                    {step.body.split('\n').map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <CtaButton size="pc" className={styles.Step__Cta} />
      </div>
    </section>
  );
}
