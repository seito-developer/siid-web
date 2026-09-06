import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_DIFFERENCE_POINTS, LP2_DIFFERENCE_TABLE } from '@/constants/lp2Difference';

import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Difference.module.css';

// DIFFERENCE(docs/spec/lp2-sections/07-difference.md)。
// POINT カード 3 枚と、他社との比較表(7 行 x 4 列)。
// 表は <table> で組む。SP では横スクロールさせる。

export default function Difference() {
  const { head, rows } = LP2_DIFFERENCE_TABLE;

  return (
    <section className={styles.Difference} id="difference">
      <SectionBg
        name="difference"
        pcWidth={1440}
        pcHeight={1361}
        spWidth={750}
        spHeight={2978}
      />

      <div className={styles.Difference__Inner}>
        <SectionLabel className={styles.Difference__Label}>DIFFERENCE</SectionLabel>
        <h2 className={styles.Difference__Title}>他社スクールとの違い</h2>

        <ul className={styles.Difference__Points}>
          {LP2_DIFFERENCE_POINTS.map((point) => (
            <li key={point.no} className={styles.Difference__Point}>
              <Image
                src={lp2Asset(`/images/lp-2/${point.image}.webp`)}
                alt=""
                width={334}
                height={298}
                sizes="(min-width: 768px) 334px, 100vw"
                quality={LP2_IMAGE_QUALITY}
              />
              <p className={styles.Difference__PointNo}>
                <span>POINT</span>
                <strong>{point.no}</strong>
              </p>
              <p className={styles.Difference__PointTitle}>
                {point.title.split('\n').map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className={styles.Difference__TableWrap}>
          <table className={styles.Difference__Table}>
            <thead>
              <tr>
                {head.map((label, i) => (
                  <th key={label} scope="col" className={i === 1 ? styles.isOurs : undefined}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td className={styles.isOurs}>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
