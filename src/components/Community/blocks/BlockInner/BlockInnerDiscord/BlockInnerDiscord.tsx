import styles from './BlockInnerDiscord.module.css';

export default function ImagesArea() {
  return (
    <div className={styles.imgWrapper}>
      <img src="/community/online-01.png" alt="画像1" className={styles.imgItem} />
      <img src="/community/online-02.png" alt="画像1" className={styles.imgItem} />
      <img src="/community/online-03.png" alt="画像1" className={styles.imgItem} />
      <img src="/community/online-04.png" alt="画像1" className={styles.imgItem} />
    </div>
  )
}