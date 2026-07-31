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
    description: '本物が本気で付き合います。こんな講師から学べるスクールは他に存在し得ないと思います。だからこそ成果を出していただく自信があります。',
    image: '/siid/images/cource/timeline/timelineitem/1year.jpg',
  },
  {
    title: '理想の働き方を実現',
    subtitle: 'Uターン、リモートワーク、フレックスなど',
    description: 'Youtubeだけでは個々の課題にパーソナライズできないとセイト自身が悩んで立ち上げたプログラミングスクール。本物が本気で付き合います。こんな講師から学べるスクールは他に存在し得ないと思います。',
    image: '/siid/images/cource/timeline/timelineitem/3years.webp',
  },
  {
    title: 'さらなる未来への挑戦',
    subtitle: 'PM、コンサル、フリーランス、大手企業転職、海外就職など',
    description: '本物が本気で付き合います。こんな講師から学べるスクールは他に存在し得ないと思います。だからこそ成果を出していただく自信があります。',
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
