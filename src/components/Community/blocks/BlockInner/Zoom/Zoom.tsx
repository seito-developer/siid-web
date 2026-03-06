import Image from 'next/image';

import styles from './Zoom.module.css';

export default function Zoom() {
  return (
    <div className={styles.Zoom__Wrapper}>
      <Image src="/images/community/online-zoom.png" alt="毎回多くの方に参加いただいてます" width={800} height={450} className={styles.Zoom__TopImage} />
      <ul className={styles.Zoom__IconWrapper}>
        <li className={styles.Zoom__IconItem}>
          <Image src="/images/community/zoom-icon-01.svg" alt="" width={40} height={40} className={styles.Zoom__Icon} />
          <p className={styles.Zoom__IconText}>カメラOFF<br />可能！</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <Image src="/images/community/zoom-icon-02.svg" alt="" width={40} height={40} className={styles.icons} />
          <p className={styles.Zoom__IconText}>予約不要！</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <Image src="/images/community/zoom-icon-03.svg" alt="" width={40} height={40} className={styles.icons} />
          <p className={styles.Zoom__IconText}>入退出自由の<br />ハードルの低さ</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <Image src="/images/community/zoom-icon-04.svg" alt="" width={40} height={40} className={styles.icons} />
          <p className={styles.Zoom__IconText}>もくもく作業<br />だけでもOK</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <Image src="/images/community/zoom-icon-05.svg" alt="" width={40} height={40} className={styles.icons} />
          <p className={styles.Zoom__IconText}>自由に質問OK</p>
        </li>
      </ul>
    </div>
  );
}
