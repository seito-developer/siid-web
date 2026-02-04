import styles from './BlockInnerDiscord.module.css';

export default function BlockInnerDiscord() {
  return (
    <div className={styles.imgWrapper}>
      <img src="/images/community/online-01.png" alt="もくもく会の開催連絡" className={styles.imgItem} />
      <img src="/images/community/online-02.png" alt="日々の学習進捗や雑談など" className={styles.imgItem} />
      <img src="/images/community/online-03.png" alt="サービスリリース報告も" className={styles.imgItem} />
      <img src="/images/community/online-04.png" alt="アップデートのお知らせ" className={styles.imgItem} />
    </div>
  )
}