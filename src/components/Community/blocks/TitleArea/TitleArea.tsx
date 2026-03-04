import styles from './TitleArea.module.css';

const TitleArea = () => {
  return (
    <>
      <p className={styles.TitleArea__TitleEn}>&lt;/ <span className={styles.TitleArea__En}>Online</span> &gt;</p>
      <h2 className={styles.TitleArea__Title}>オンライン</h2>
      <p className={styles.TitleArea__Lead}>DiscordやZoomを通じて常に相談できる体制</p>
    </>
  )
}

export default TitleArea;