import Link from 'next/link';

import { getInterviews } from '@/lib/getInterviews';
import { BLOG_URL } from '@/utils/interview';

import styles from './CareerPath.module.css';
import CareerPathSlider from './CareerPathSlider/CareerPathSlider';

// TOP のスライダーに出す最新記事の件数
const SLIDER_LIMIT = 8;

export default async function CareerPath() {
  const { contents } = await getInterviews({ limit: SLIDER_LIMIT });

  return (
    <div className={styles.CareerPath}>
      <div className={styles.CareerPath__Header}>
        <div className={styles.CareerPath__Title}>{'</ CareerPath >'}</div>
        <h2 className={styles.CareerPath__Heading}>卒業生の進路</h2>
        <div className={styles.CareerPath__DetailButtonContainer}>
          <Link href="/career-path" className={styles.CareerPath__DetailButton}>
            <span className={styles.CareerPath__DetailButtonText}>
              インタビューの
              <br className="br-sp" />
              詳細を見る
            </span>
            <svg width="11" height="11" fill="none">
              <use href="#rightArrowWhite"></use>
            </svg>
          </Link>
        </div>
      </div>
      <div className={styles.CareerPath__PoweredBy}>
        <span className={styles.CareerPath__PoweredByLabel}>Powered by</span>
        <Link href={`${BLOG_URL}/category/interview`} className={styles.CareerPath__PoweredByText} target="_blank" rel="noopener noreferrer">
          SiiD BLOG
        </Link>
      </div>
      {/* 取得失敗・0 件のときはスライダーを出さない（Swiper の loop が空で動かないため） */}
      {contents.length > 0 && <CareerPathSlider data={contents} />}
    </div>
  );
}
