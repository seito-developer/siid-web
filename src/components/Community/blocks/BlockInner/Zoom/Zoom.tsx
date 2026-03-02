import styles from './Zoom.module.css';

export default function Zoom() {
  return (
    <div className={styles.Zoom__Wrapper}>
      <img src="/images/community/online-zoom.png" alt="毎回多くの方に参加いただいてます" className={styles.Zoom__TopImage} />
      <ul className={styles.Zoom__IconWrapper}>
        <li className={styles.Zoom__IconItem}>
          <img src="/images/community/zoom-icon-01.svg" className={styles.Zoom__Icon} />
          <p className={styles.Zoom__IconText}>カメラOFF<br />可能！</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <img src="/images/community/zoom-icon-02.svg" className={styles.icons} />
          <p className={styles.Zoom__IconText}>予約不要！</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <img src="/images/community/zoom-icon-03.svg" className={styles.icons} />
          <p className={styles.Zoom__IconText}>入退出自由の<br />ハードルの低さ</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <img src="/images/community/zoom-icon-04.svg" className={styles.icons} />
          <p className={styles.Zoom__IconText}>もくもく作業<br />だけでもOK</p>
        </li>
        <li className={styles.Zoom__IconItem}>
          <img src="/images/community/zoom-icon-05.svg" className={styles.icons} />
          <p className={styles.Zoom__IconText}>自由に質問OK</p>
        </li>
      </ul>
    </div>
  )
}