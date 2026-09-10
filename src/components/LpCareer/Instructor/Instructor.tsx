
import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Instructor.module.css';

// INSTRUCTOR(docs/spec/lp-career-sections/05-instructor.md)。
// PC は写真を左・テキストを右に置く 2 カラム、SP は縦積み。

// カンプでは行の先頭だけ黄色の強調が入る(行全体ではない)。
// tail は SP で改行する後半(PC は 1 行に収まる)。
const BULLETS = [
  {
    accent: '',
    text: '株式会社LIGで海外事業部長／',
    tail: 'フィリピン支社代表・VPoEを歴任',
  },
  {
    accent: '約100名規模のエンジニアチーム',
    text: 'を統括。',
    tail: '2,000人超を選考、150名以上を採用',
  },
  {
    accent: 'YouTube登録者 13万人',
    text: '／',
    tail: '著書『セイト先生が教えるプログラミング入門』',
  },
];

export default function Instructor() {
  return (
    <section className={styles.Instructor} id="instructor">
      <SectionBg
        name="instructor"
        pcWidth={1440}
        pcHeight={901}
        spWidth={750}
        spHeight={1633}
      />

      <div className={styles.Instructor__Inner}>
        <SectionLabel inverse className={styles.Instructor__Label}>
          INSTRUCTOR
        </SectionLabel>

        <div className={styles.Instructor__Main}>
          {/* 講師の写真はセクション背景の画像に含まれる */}

          <div className={styles.Instructor__Text}>
            {/* PC は 3 行、SP は 2 行。SP の 1 行目だけ長体がかかっている */}
            <h2 className={styles.Instructor__Copy}>
              <span className={styles.Instructor__CopyHead}>
                採用する側を
                <br className={styles.Instructor__CopyBreak} />
                知る講師<span className={styles.Instructor__CopyWhite}>が、</span>
              </span>
              <br />
              <span className={styles.Instructor__CopyLast}>市場価値を設計する</span>
            </h2>

            <p className={styles.Instructor__Name}>堀口 セイト</p>

            <p className={styles.Instructor__Badge}>合同会社BugFix 代表・主任講師</p>
            <p className={styles.Instructor__Badge}>ミネルバ大学院卒</p>
          </div>
        </div>

        <ul className={styles.Instructor__Bullets}>
          {BULLETS.map((item) => (
            <li key={item.tail}>
              {item.accent && <strong className={styles.isAccent}>{item.accent}</strong>}
              {item.text}
              <br className={styles.Instructor__BulletBreak} />
              {item.tail}
            </li>
          ))}
        </ul>

        <CtaButton size="pc" className={styles.Instructor__Cta} />
      </div>
    </section>
  );
}
