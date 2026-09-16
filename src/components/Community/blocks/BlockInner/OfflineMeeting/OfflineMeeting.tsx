import Image from 'next/image';

import styles from './OfflineMeeting.module.css';

export default function OfflineMeeting() {
  return (
    <div className={styles.OfflineMeeting}>
      <Image src="/siid/images/community/offmeet-01.webp" alt="オフ会で集まった受講生と講師の集合写真" width={400} height={300} />
      <Image src="/siid/images/community/offmeet-02.webp" alt="オフ会の食事会で談笑する受講生たち" width={400} height={300} />
    </div>
  );
}
