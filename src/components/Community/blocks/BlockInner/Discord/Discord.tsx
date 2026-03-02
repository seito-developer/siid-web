import styles from './Discord.module.css';

export default function Discord() {
  return (
    <div className={styles.Discord__Images}>
      <img src="/images/community/online-01.png" alt="もくもく会の開催連絡" className={styles.Discord__Item} />
      <img src="/images/community/online-02.png" alt="日々の学習進捗や雑談など" className={styles.Discord__Item} />
      <img src="/images/community/online-03.png" alt="サービスリリース報告も" className={styles.Discord__Item} />
      <img src="/images/community/online-04.png" alt="アップデートのお知らせ" className={styles.Discord__Item} />
    </div>
  )
}