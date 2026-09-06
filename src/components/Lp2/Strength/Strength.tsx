import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_STRENGTHS } from '@/constants/lp2Strengths';

import SectionBg from '../SectionBg/SectionBg';

import styles from './Strength.module.css';

// STRENGTH(docs/spec/lp2-sections/06-strength.md)。
// 黄色い帯の見出しの下に、白いカード 3 枚を横並びにする。

export default function Strength() {
  return (
    <section className={styles.Strength} id="strength">
      <SectionBg
        name="strength"
        pcWidth={1440}
        pcHeight={1041}
        spWidth={750}
        spHeight={3122}
      />

      <div className={styles.Strength__Head}>
        <p className={styles.Strength__Label}>STRENGTH</p>
        <h2 className={styles.Strength__Title}>
          結果を生む、
          <br />
          <span className={styles.Strength__TitleLarge}>SiiDだけの3つの強み</span>
        </h2>
      </div>

      <ul className={styles.Strength__Cards}>
        {LP2_STRENGTHS.map((item) => (
          <li key={item.no} className={styles.Strength__Card}>
            <Image
              className={styles.Strength__Photo}
              src={lp2Asset(`/images/lp-2/${item.photo}.webp`)}
              alt=""
              width={316}
              height={168}
              sizes="(min-width: 768px) 316px, 100vw"
              quality={LP2_IMAGE_QUALITY}
            />
            <p className={styles.Strength__Badge}>
              <span>STRENGTH</span>
              <strong>{item.no}</strong>
            </p>
            <h3 className={styles.Strength__CardTitle}>
              {item.title.split('\n').map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h3>
            <p className={styles.Strength__Body}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
