import styles from './CareerPath.module.css';
import CareerPathSlider from './CareerPathSlider/CareerPathSlider';

export default function CareerPath() {
  return (
    <div className={styles.CareerPath}>
      <div className={styles.CareerPath__Header}>
        <div className={styles.CareerPath__Title}>{'</ CareerPath >'}</div>
        <h2 className={styles.CareerPath__Heading}>卒業生の進路</h2>
        <div className={styles.CareerPath__DetailButtonContainer}>
          <a href="#" className={styles.CareerPath__DetailButton}>
            <span className={styles.CareerPath__DetailButtonText}>
              インタビューの
              <br className="br-sp" />
              詳細を見る
            </span>
            <svg width="11" height="11" fill="none">
              <use href="#rightArrowWhite"></use>
            </svg>
          </a>
        </div>
      </div>
      <div className={styles.CareerPath__PoweredBy}>
        <span className={styles.CareerPath__PoweredByLabel}>Powered by</span>
        <a href="" className={styles.CareerPath__PoweredByText} target="_blank" rel="noopener noreferrer">
          セイト先生のWeb・ITエンジニア転職ラボ
        </a>
      </div>
      <CareerPathSlider />
    </div>
  );
}
