import Image from 'next/image';

import styles from './Discord.module.css';

export default function Discord() {
  return (
    <div className={styles.Discord__Images}>
      <Image src="/images/community/online-01.png" alt="もくもく会の開催連絡" width={400} height={250} className={styles.Discord__Item} />
      <Image src="/images/community/online-02.png" alt="日々の学習進捗や雑談など" width={400} height={250} className={styles.Discord__Item} />
      <Image src="/images/community/online-03.png" alt="サービスリリース報告も" width={400} height={250} className={styles.Discord__Item} />
      <Image src="/images/community/online-04.png" alt="アップデートのお知らせ" width={400} height={250} className={styles.Discord__Item} />
    </div>
  );
}
