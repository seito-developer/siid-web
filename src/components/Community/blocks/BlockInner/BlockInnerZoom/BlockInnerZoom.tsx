import styles from './BlockInnerZoom.module.css';

export default function ZoomContents() {
  return (
    <div>
      <img src="/community/online-zoom.png" alt="毎回多くの方に参加いただいてます" className={styles.topImage} />
      <ul className={styles.iconWrapper}>
        <li className={styles.iconItem}>
          <img src="/community/zoom-icon-01.svg" alt="" className={styles.icons} />
          <p className={styles.iconText}>カメラOFF<br />可能！</p>
        </li>
        <li className={styles.iconItem}>
          <img src="/community/zoom-icon-02.svg" alt="" className={styles.icons} />
          <p className={styles.iconText}>予約不要！</p>
        </li>
        <li className={styles.iconItem}>
          <img src="/community/zoom-icon-03.svg" alt="" className={styles.icons} />
          <p className={styles.iconText}>入退出自由の<br />ハードルの低さ</p>
        </li>
        <li className={styles.iconItem}>
          <img src="/community/zoom-icon-04.svg" alt="" className={styles.icons} />
          <p className={styles.iconText}>もくもく作業<br />だけでもOK</p>
        </li>
        <li className={styles.iconItem}>
          <img src="/community/zoom-icon-05.svg" alt="" className={styles.icons} />
          <p className={styles.iconText}>自由に質問OK</p>
        </li>
      </ul>
    </div>
  )
}