import Image from 'next/image';

import { LP_CAREER_IMAGE_QUALITY, lpCareerAsset } from '@/constants/lpCareerAssets';

import CtaButton from '../CtaButton/CtaButton';
import SectionBg from '../SectionBg/SectionBg';

import styles from './Fv.module.css';
import FvVideo from './FvVideo';

// FV(docs/spec/lp-career-sections/02-fv.md と 02-fv.notes.md)。
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
        <FvVideo />
        <span className={styles.Fv__Scrim} aria-hidden="true" />
      </div>

      <div className={styles.Fv__Body}>
        <p className={styles.Fv__Tagline}>AI × PROGRAMMING × CAREER</p>

        <h1 className={styles.Fv__Copy}>
          AI時代に、
          <br />
          <span className={styles.Fv__CopyAccent}>
            選ばれる
            {/* SP のカンプは「選ばれる／エンジニアへ」で改行する */}
            <br className={styles.Fv__CopyBreak} />
            エンジニアへ
          </span>
        </h1>

        <p className={`${styles.Fv__Ribbon} ${styles.Fv__RibbonAccent}`}>元人事部長の現役エンジニアが</p>
        <p className={styles.Fv__Ribbon}>学習から内定まで総合プロデュース</p>

        <div className={styles.Fv__Badge}>
          <Image
            className={styles.Fv__BadgeBg}
            src={lpCareerAsset('/images/lp-career/fv-badge-card.webp')}
            alt=""
            width={330}
            height={97}
            quality={LP_CAREER_IMAGE_QUALITY}
            priority
          />
          <span className={styles.Fv__BadgeMinistry}>経済産業省</span>
          <span className={styles.Fv__BadgeTitle}>リスキル講座認定</span>
          <span className={styles.Fv__BadgeGrant}>
            給付金 最大<strong>80%</strong>対象
          </span>
        </div>
      </div>

      <div className={styles.Fv__Band}>
        {/* SP は回路基板の背景・メダルの意匠・CTA の枠を書き出し画像に含める */}
        <SectionBg
          name="fv-band"
          spOnly
          pcWidth={750}
          pcHeight={575}
          spWidth={750}
          spHeight={575}
          className={styles.Fv__BandBg}
        />

        <ul className={styles.Fv__Medals}>
          {MEDALS.map((medal) => (
            <li key={medal.label} className={styles.Fv__Medal}>
              <Image
                className={styles.Fv__MedalImage}
                src={lpCareerAsset('/images/lp-career/fv-medal.webp')}
                alt=""
                width={169}
                height={181}
                quality={LP_CAREER_IMAGE_QUALITY}
                priority
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
