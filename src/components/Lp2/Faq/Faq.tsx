import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_FAQ } from '@/constants/lp2Faq';

import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Faq.module.css';

// FAQ(docs/spec/lp2-sections/14-faq.md)。
// <details>/<summary> で組むため開閉に JavaScript は要らない。
// カンプでは Q1 だけ開いた状態なので、1 問目に open を付ける。

export default function Faq() {
  return (
    <section className={styles.Faq} id="faq">
      <Image
        className={styles.Faq__Bg}
        src={lp2Asset('/images/lp-2/faq-bg.webp')}
        alt=""
        width={1440}
        height={1256}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.Faq__Inner}>
        <SectionLabel className={styles.Faq__Label}>FAQ</SectionLabel>
        <h2 className={styles.Faq__Heading}>よくある質問</h2>

        <ul className={styles.Faq__List}>
          {LP2_FAQ.map((item, i) => (
            <li key={item.q}>
              <details className={styles.Faq__Item} open={i === 0}>
                <summary className={styles.Faq__Question}>
                  <span className={styles.Faq__No}>Q{i + 1}</span>
                  <span className={styles.Faq__QuestionText}>{item.q}</span>
                  <span className={styles.Faq__Mark} aria-hidden="true" />
                </summary>
                <div className={styles.Faq__Answer}>
                  {item.a.split('\n').map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
