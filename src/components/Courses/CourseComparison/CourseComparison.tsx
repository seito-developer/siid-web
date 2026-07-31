import Image from 'next/image';

import { CourseComparisonData, CoursePlan } from '@/lib/getCoursePlans';

import SectionHeading from '../SectionHeading/SectionHeading';

import styles from './CourseComparison.module.css';

const BASIC_LANGS = [
  { name: 'HTML5', file: 'html5' },
  { name: 'CSS3', file: 'css3' },
  { name: 'JavaScript', file: 'javascript' },
  { name: 'ES6', file: 'es6' },
  { name: 'Node.js', file: 'nodejs' },
  { name: 'PHP', file: 'php' },
  { name: 'Laravel', file: 'laravel' },
  { name: 'PostgreSQL', file: 'postgresql' },
  { name: 'Fly.io', file: 'flyio' },
  { name: 'Vite', file: 'vite' },
  { name: 'Firebase', file: 'firebase' },
  { name: 'Docker', file: 'docker' },
];

const ADVANCED_LANGS = [
  { name: 'TypeScript', file: 'typescript' },
  { name: 'React', file: 'react' },
  { name: 'Python', file: 'python' },
];

type Props = {
  plans: CoursePlan[];
  comparison: CourseComparisonData;
};

export default function CourseComparison({ plans, comparison }: Props) {
  return (
    <section className={styles.CourseComparison}>
      <SectionHeading en="Message" title="コースによる違い" invert />
      <div className={styles.CourseComparison__Scroller}>
        <table className={styles.CourseComparison__Table}>
          <thead>
            <tr>
              <td className={styles.CourseComparison__Spacer} colSpan={2} />
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={`${styles.CourseComparison__CourseHeader} ${styles[`is-${plan.id}`]}`}
                  scope="col"
                >
                  {plan.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.CourseComparison__GroupHeader} colSpan={2} scope="row">
                目標とするゴール
              </th>
              {comparison.goal.map((goal, i) => (
                <td key={i} className={styles.CourseComparison__Cell}>
                  {goal.items ? (
                    <ul className={styles.CourseComparison__GoalList}>
                      {goal.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      {goal.text}
                      <em className={styles[`em-${plans[i].id}`]}>{goal.em}</em>
                    </p>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <th className={styles.CourseComparison__GroupHeader} rowSpan={3} scope="rowgroup">
                学習範囲
                <span className={styles.CourseComparison__GroupNote}>
                  対応一覧表は<u>こちら</u>
                </span>
              </th>
              <th className={styles.CourseComparison__SubHeader} scope="row">
                言語
              </th>
              <td className={styles.CourseComparison__Cell} colSpan={3}>
                <div className={styles.CourseComparison__Langs}>
                  <div className={styles.CourseComparison__LangBasic}>
                    <span className={styles.CourseComparison__LangLabel}>ベーシック</span>
                    <ul className={styles.CourseComparison__LangIcons}>
                      {BASIC_LANGS.map((lang) => (
                        <li key={lang.file}>
                          <Image
                            src={`/siid/images/courses/langs/${lang.file}.webp`}
                            alt={lang.name}
                            width={36}
                            height={36}
                          />
                        </li>
                      ))}
                      <li className={styles.CourseComparison__LangEtc}>etc...</li>
                    </ul>
                  </div>
                  <div className={styles.CourseComparison__LangAdvanced}>
                    <span className={styles.CourseComparison__LangLabel}>＋応用</span>
                    <span className={styles.CourseComparison__LangNote}>
                      ※Full Support,VIP Editionコースのみ
                    </span>
                    <ul className={styles.CourseComparison__LangIcons}>
                      {ADVANCED_LANGS.map((lang) => (
                        <li key={lang.file}>
                          <Image
                            src={`/siid/images/courses/langs/${lang.file}.webp`}
                            alt={lang.name}
                            width={36}
                            height={36}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th className={styles.CourseComparison__SubHeader} scope="row">
                ソフトウェア
                <br />
                スキル
              </th>
              <td className={styles.CourseComparison__Cell} colSpan={3}>
                <ul className={styles.CourseComparison__SharedList}>
                  {comparison.software.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th className={styles.CourseComparison__SubHeader} scope="row">
                ヒューマン
                <br />
                スキル
              </th>
              <td className={styles.CourseComparison__Cell} colSpan={3}>
                <ul className={styles.CourseComparison__SharedList}>
                  {comparison.human.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
            {comparison.rows.map((row, rowIndex) => (
              <tr key={row.label}>
                {rowIndex === 0 && (
                  <th
                    className={styles.CourseComparison__GroupHeader}
                    rowSpan={comparison.rows.length}
                    scope="rowgroup"
                  >
                    実施内容
                  </th>
                )}
                <th className={styles.CourseComparison__SubHeader} scope="row">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className={styles.CourseComparison__Cell}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.CourseComparison__Note}>
        <span>※</span>
        <span className={styles.CourseComparison__NoteBody}>{comparison.note}</span>
      </p>
    </section>
  );
}
