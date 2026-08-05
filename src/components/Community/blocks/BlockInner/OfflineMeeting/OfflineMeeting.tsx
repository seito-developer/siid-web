import Image from 'next/image';

import styles from './OfflineMeeting.module.css';

export default function OfflineMeeting() {
  return (
    <div className={styles.OfflineMeeting}>
      <Image src="/siid/images/community/offmeet-01.webp" alt="オフ会写真①" width={400} height={300} />
      <Image src="/siid/images/community/offmeet-02.webp" alt="オフ会写真②" width={400} height={300} />
    </div>
  );
}
