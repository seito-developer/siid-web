import styles from './TitleArea.module.css';

const TitleArea = () => {
  return (
    <div className={styles.railPcLeft}>
      <p className={styles.titleEn}>&lt;/ <span className={styles.en}>Online</span> &gt;</p>
      <h2 className={styles.title}>オンライン</h2>
      <p className={styles.lead}>DiscordやZoomを通じて常に相談できる体制</p>
    </div>
  )
}

export default TitleArea;