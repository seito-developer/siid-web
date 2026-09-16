import styles from './Timeline.module.css';
import TimelineItem from './TimelineItem/TimelineItem';

type TimelineItemData = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

// タイムラインデータ
const timelineItems: TimelineItemData[] = [
  {
    title: 'ITエンジニアのキャリアを開始',
    subtitle: 'アプリ開発、チームワーク、技術で課題解決',
    description: '未経験からITエンジニアとして現場に立ち、チームでの開発を経験する時期です。SiiDで身につけた基礎技術と生成AIの活用力を武器に、任される仕事の幅を広げていきます。',
    image: '/siid/images/cource/timeline/timelineitem/1year.jpg',
  },
  {
    title: '理想の働き方を実現',
    subtitle: 'Uターン、リモートワーク、フレックスなど',
    description: '実務経験を積み、設計から実装まで一人で担えるようになる頃には、働く場所や時間を自分で選べるようになります。リモートワークや地方移住など、ライフスタイルに合わせたキャリアを描けます。',
    image: '/siid/images/cource/timeline/timelineitem/3years.webp',
  },
  {
    title: 'さらなる未来への挑戦',
    subtitle: 'PM、コンサル、フリーランス、大手企業転職、海外就職など',
    description: '技術と経験を土台に、マネジメントや独立、海外で働くなど選択肢はさらに広がります。キャリアの節目で迷ったときも、SiiDの講師とコミュニティが次の一歩を支えます。',
    image: '/siid/images/cource/timeline/timelineitem/5-8years.jpg',
  },
];

export default function Timeline() {
  return (
    <div className={styles.Timeline__Container}>
      <div className={styles.Timeline__Inner}>
        <div className={styles.Timeline}>
          {/* 1年後 */}
          <div className={styles.Timeline__YearItem}>
            <span className={styles.Timeline__YearLabel}>{'Career \nroad'}</span>
            <span className={styles.Timeline__Year}>
              <span className={styles.Timeline__YearText}>
                <span className={styles.Timeline__YearTextLabel}>1年後</span>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
              </span>
            </span>
          </div>
          <TimelineItem index={0} {...timelineItems[0]} />

          {/* 3年後 */}
          <div className={styles.Timeline__YearItem}>
            <span className={styles.Timeline__Year}>
              <span className={styles.Timeline__YearText}>
                <span className={styles.Timeline__YearTextLabel}>3年後</span>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
              </span>
            </span>
          </div>
          <TimelineItem index={1} {...timelineItems[1]} />

          {/* 5-8年後 */}
          <div className={styles.Timeline__YearItem}>
            <span className={styles.Timeline__Year}>
              <span className={styles.Timeline__YearText}>
                <span className={styles.Timeline__YearTextLabel}>5-8年後</span>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
                <svg width="14" height="14" fill="none">
                  <use href="#StarBlue" />
                </svg>
              </span>
            </span>
          </div>
          <TimelineItem index={2} {...timelineItems[2]} />
        </div>
      </div>
    </div>
  );
}
