import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import CtaButton from '../CtaButton/CtaButton';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Instructor.module.css';

// INSTRUCTOR(docs/spec/lp2-sections/05-instructor.md)。
// PC は写真を左・テキストを右に置く 2 カラム、SP は縦積み。

const BULLETS = [
  { text: '株式会社LIGで海外事業部長／フィリピン支社代表・VPoEを歴任', accent: false },
  { text: '約100名規模のエンジニアチームを統括。2,000人超を選考、150名以上を採用', accent: true },
  { text: 'YouTube登録者 13万人／著書『セイト先生が教えるプログラミング入門』', accent: true },
];

export default function Instructor() {
  return (
    <section className={styles.Instructor} id="instructor">
      <Image
        className={styles.Instructor__Bg}
        src={lp2Asset('/images/lp-2/instructor-bg.webp')}
        alt=""
        width={1440}
        height={901}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.Instructor__Inner}>
        <SectionLabel inverse className={styles.Instructor__Label}>
          INSTRUCTOR
        </SectionLabel>

        <div className={styles.Instructor__Main}>
          <Image
            className={styles.Instructor__Photo}
            src={lp2Asset('/images/lp-2/instructor-photo.webp')}
            alt="講師 堀口セイト"
            width={663}
            height={565}
            sizes="(min-width: 768px) 663px, 100vw"
          />

          <div className={styles.Instructor__Text}>
            <h2 className={styles.Instructor__Copy}>
              採用する側を
              <br />
              知る講師が、
              <br />
              市場価値を設計する
            </h2>

            <p className={styles.Instructor__Name}>堀口 セイト</p>

            <p className={styles.Instructor__Badge}>合同会社BugFix 代表・主任講師</p>
            <p className={styles.Instructor__Badge}>ミネルバ大学院卒</p>
          </div>
        </div>

        <ul className={styles.Instructor__Bullets}>
          {BULLETS.map((item) => (
            <li key={item.text} className={item.accent ? styles.isAccent : undefined}>
              {item.text}
            </li>
          ))}
        </ul>

        <CtaButton size="pc" className={styles.Instructor__Cta} />
      </div>
    </section>
  );
}
