import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import CtaButton from '../CtaButton/CtaButton';

import styles from './Fv.module.css';

// FV(docs/spec/lp2-sections/02-fv.md と 02-fv.notes.md)。
//
// カンプの背景は Zoom 画面のスクリーンショットに顔隠しの絵文字を貼った「動画の仮置き」で、
// 実際に支給された動画とは別カット。仮置きは実装せず動画に差し替える(決定済み)。
// 白文字を読ませるための暗いスクリム(PSD の over)は動画の上に残す。

const MEDALS = [
  { label: '目標', sub: '達成率', value: '88', unit: '%' },
  { label: '受講生', sub: '満足度', value: '92', unit: '%' },
  { label: 'YouTube', sub: '登録者', value: '13', unit: '万人' },
];

export default function Fv() {
  return (
    <section className={styles.Fv} id="fv">
      <div className={styles.Fv__Media}>
        <video
          className={styles.Fv__Video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={lp2Asset('/videos/lp-2/fv-pc-poster.webp')}
          aria-hidden="true"
        >
          {/* SP には SP 用の軽いファイルを読ませる。LCP に直結するため */}
          <source src={lp2Asset('/videos/lp-2/fv-sp.mp4')} type="video/mp4" media="(max-width: 767px)" />
          <source src={lp2Asset('/videos/lp-2/fv-pc.mp4')} type="video/mp4" />
        </video>
        <span className={styles.Fv__Scrim} aria-hidden="true" />
      </div>

      <div className={styles.Fv__Body}>
        <p className={styles.Fv__Tagline}>AI × PROGRAMMING × CAREER</p>

        <h1 className={styles.Fv__Copy}>
          AI時代に、
          <br />
          <span className={styles.Fv__CopyAccent}>選ばれるエンジニアへ</span>
        </h1>

        <p className={`${styles.Fv__Ribbon} ${styles.Fv__RibbonAccent}`}>元人事部長の現役エンジニアが</p>
        <p className={styles.Fv__Ribbon}>学習から内定まで総合プロデュース</p>

        <div className={styles.Fv__Badge}>
          <Image
            className={styles.Fv__BadgeBg}
            src={lp2Asset('/images/lp-2/fv-badge-card.webp')}
            alt=""
            width={330}
            height={97}
            quality={LP2_IMAGE_QUALITY}
          />
          <span className={styles.Fv__BadgeMinistry}>経済産業省</span>
          <span className={styles.Fv__BadgeTitle}>リスキル講座認定</span>
          <span className={styles.Fv__BadgeGrant}>
            給付金 最大<strong>80%</strong>対象
          </span>
        </div>
      </div>

      <div className={styles.Fv__Band}>
        <ul className={styles.Fv__Medals}>
          {MEDALS.map((medal) => (
            <li key={medal.label} className={styles.Fv__Medal}>
              <Image
                src={lp2Asset('/images/lp-2/fv-medal.webp')}
                alt=""
                width={169}
                height={181}
                quality={LP2_IMAGE_QUALITY}
              />
              <span className={styles.Fv__MedalLabel}>
                {medal.label}
                <br />
                {medal.sub}
              </span>
              <span className={styles.Fv__MedalValue}>
                {medal.value}
                <small>{medal.unit}</small>
              </span>
            </li>
          ))}
        </ul>

        <CtaButton size="pc" className={styles.Fv__Cta} />
        <p className={styles.Fv__Note}>※当社集計</p>
      </div>
    </section>
  );
}
