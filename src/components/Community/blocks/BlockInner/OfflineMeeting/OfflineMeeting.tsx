import Image from 'next/image';

import styles from './OfflineMeeting.module.css';

export default function OfflineMeeting() {
  return (
    <div className={styles.OfflineMeeting}>
      <Image src="/images/community/offmeet-01.png" alt="オフ会写真①" width={400} height={300} />
      <Image src="/images/community/offmeet-02.png" alt="オフ会写真①" width={400} height={300} />
    </div>
  );
}
