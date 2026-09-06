import SectionBg from '../SectionBg/SectionBg';

import styles from './About.module.css';

// ABOUT(docs/spec/lp2-sections/03-about.md)。
// 紫 → 水色の横グラデーションの上に、角飾り付きの枠と 4 ブロックのコピー。
// PSD 上のフォントはすべて Noto Sans CJK JP。見出しも筑紫ゴシックではない。

export default function About() {
  return (
    <section className={styles.About} id="about">
      {/* 背景のグラデーション・ロゴ透かし・枠・下線と三角・白帯はすべて
          セクション背景の画像に含まれる。ここでは文字だけを重ねる */}
      <SectionBg name="about" pcWidth={1440} pcHeight={456} spWidth={750} spHeight={560} />

      <div className={styles.About__Frame}>
        {/* SP は「教える」で改行する(カンプの組み方) */}
        <p className={styles.About__Lead}>
          SiiDは、AIの技術だけを教える
          <span className={styles.About__LeadBreak} />
          スクールではありません
        </p>

        {/* SP は「元人事部長の講師 が」で改行する(カンプの組み方) */}
        <p className={styles.About__Sub}>
          <strong>元人事部長の講師</strong>が<wbr />
          <span className={styles.About__SubBreak} />
          採用する側の目線で、
        </p>

        {/* カンプは閉じ括弧と「へ」の間が少し空いている */}
        <h2 className={styles.About__Copy}>
          「企業が求めるAI人材」<span className={styles.About__CopyTail}>へ</span>
        </h2>

        {/* SP では 2 行それぞれに白帯が付くため、行ごとに span を分ける */}
        <p className={styles.About__Result}>
          <span>総合プロデュースすることで</span>
          <span>収入アップに繋げます</span>
        </p>
      </div>
    </section>
  );
}
