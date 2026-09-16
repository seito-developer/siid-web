import Link from 'next/link';

import Logo from '../Logo/Logo';

import styles from './Cource.module.css';
import CourseSlider from './CourseSlider/CourseSlider';
import FutureItem from './FutureItem/FutureItem';
import ReskillBannerSection from './ReskillBannerSection/ReskillBannerSection';
import Timeline from './Timeline/Timeline';

export default function Cource() {
  // 未来の項目データ
  const futureItems = [
    { number: '01', text: '8-12ヶ月でITエンジニアへ' },
    { number: '02', text: '自分が作りたいアプリを自分で実装できる' },
    { number: '03', text: '困った時に相談できる講師や先輩' },
    { number: '04', text: 'キャリアや経済不安からの脱却' },
    { number: '05', text: 'さまざまなキャリアの選択肢', subText: '（リモートワーク、有名企業、フリーランス、海外、など）' },
  ];

  return (
    <div className={styles.Cource}>
      <div className={styles.Cource__Container}>
        {/* ヘッダー */}
        <div className={styles.Cource__Header}>
          <div className={styles.Cource__Title}>{'</ Course >'}</div>
          <h2 className={styles.Cource__Heading}>コース紹介</h2>
          <div className={styles.Cource__DetailButtonContainer}>
            <Link href="/courses" className={styles.Cource__DetailButton}>
              <span className={styles.Cource__DetailButtonText}>
                コースの
                <br className="br-sp" />
                詳細を見る
              </span>
              <svg width={11} height={11} fill="none">
                <use href="#rightArrowWhite" />
              </svg>
            </Link>
          </div>
        </div>

        {/* カードスライダーセクション */}
        <div className={styles.Cource__Slider}>
          <CourseSlider />
        </div>

        {/* Reスキル講座バナー */}
        <div className={styles.Cource__ReskillBanner}>
          <ReskillBannerSection />
        </div>

        {/* SiiDで手に入る未来 */}
        <div className={styles.Cource__Future}>
          <div className={styles.Cource__FutureInner}>
            <h3 className={styles.Cource__FutureHeading}>
              <Logo fill="#000" />
              で手に入る未来
            </h3>
            <p className={styles.Cource__FutureDescription}>
              SiiDは、生成AIを味方につけたITエンジニアへの転職と、その先のキャリアまでを見据えたスクールです。
              <br />
              現役エンジニアの講師が一人ひとりの課題に向き合い、学習から転職活動、入社後の成長まで伴走します。
              <br />
              手に入るのはスキルだけではなく、自分の力でキャリアを選べる自由です。
            </p>

            <ul className={styles.Cource__FutureList}>
              {futureItems.map((item, index) => (
                <FutureItem key={index} number={item.number} text={item.text} subText={item.subText} />
              ))}
            </ul>
          </div>
        </div>

        {/* タイムラインセクション */}
        <div className={styles.Cource__Timeline}>
          <Timeline />
        </div>
      </div>
    </div>
  );
}
