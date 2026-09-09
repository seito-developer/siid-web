import Image from 'next/image';

import { lp2Asset } from '@/constants/lp2Assets';
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
        className={styles.Step__SectionBg}
        pcWidth={1440}
        pcHeight={2242}
        spWidth={750}
        spHeight={4620}
      />

      <div className={styles.Step__Inner}>
        <h2 className={styles.Step__Title}>
          <span className={styles.Step__TitleSmall}>内定までの</span>
          {/* カンプは「5」が黄色で一回り大きく、「STEP」は白 */}
          <span className={styles.Step__TitleLarge}>
            <span className={styles.Step__TitleNum}>5</span>
            <span className={styles.Step__TitleWord}>STEP</span>
          </span>
        </h2>

        <ol className={styles.Step__List}>
          {LP2_STEPS.map((step) => (
            <li key={step.no} className={styles.Step__Item}>
              {/* PCはカンプに重ね、SPは本文量に応じてカードを伸ばす。 */}
              <p className={styles.Step__Badge}>
                <span>STEP</span>
                <strong>{step.no}</strong>
              </p>

              <h3 className={styles.Step__CardTitle}>{step.title.split(/(制作|プロデュース|その後も)/).map((part, index) => (
                <span key={index}>{index === 1 && <br className={styles.Step__TitleBreak} />}{part}</span>
              ))}</h3>
              <Image className={styles.Step__Visual} src={lp2Asset(`/images/lp-2/sp/step-visual-${Number(step.no)}.webp`)} width={682} height={280} alt="" />
              <p className={styles.Step__Text}>
                {step.body.split(/(\n|(?=「飲食店))/).filter(Boolean).map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br className={line.startsWith('「飲食店') ? styles.Step__ExampleBreak : undefined} />}
                    {line.split(/(「シェアハウスの掲示板を作る」「飲食店の予約システムを作る」|「シェアハウスの掲示板を作る」|「飲食店の予約システムを作る」|会社のHP・自分の商品を売るショッピングサイト・簡単なゲーム・店舗のポイントカードアプリなど|採用担当に伝わる作品|人事目線でのアドバイス|卒業後も教材は無期限で見放題)/).map((part, index) => index % 2 === 1 ? <mark key={index} className={styles.Step__Highlight}>{part}</mark> : part)}
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
