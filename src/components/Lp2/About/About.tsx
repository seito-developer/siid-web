import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import styles from './About.module.css';

// ABOUT(docs/spec/lp2-sections/03-about.md)。
// 紫 → 水色の横グラデーションの上に、角飾り付きの枠と 4 ブロックのコピー。
// PSD 上のフォントはすべて Noto Sans CJK JP。見出しも筑紫ゴシックではない。

export default function About() {
  return (
    <section className={styles.About} id="about">
      <Image
        className={styles.About__Watermark}
        src={lp2Asset('/images/lp-2/about-logo-watermark.webp')}
        alt=""
        width={817}
        height={203}
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.About__Frame}>
        <p className={styles.About__Lead}>SiiDは、AIの技術だけを教えるスクールではありません</p>
        <span className={styles.About__Caret} aria-hidden="true" />

        {/* SP は「元人事部長の講師 が」で改行する(カンプの組み方) */}
        <p className={styles.About__Sub}>
          <strong>元人事部長の講師</strong>が<wbr />
          <span className={styles.About__SubBreak} />
          採用する側の目線で、
        </p>

        <h2 className={styles.About__Copy}>「企業が求めるAI人材」へ</h2>

        {/* SP では 2 行それぞれに白帯が付くため、行ごとに span を分ける */}
        <p className={styles.About__Result}>
          <span>総合プロデュースすることで</span>
          <span>収入アップに繋げます</span>
        </p>
      </div>
    </section>
  );
}
