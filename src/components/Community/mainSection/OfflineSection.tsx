import Event from '../blocks/BlockInner/Event/Event';
import OfflineMeeting from '../blocks/BlockInner/OfflineMeeting/OfflineMeeting';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import TitleArea from '../blocks/TitleArea/TitleArea';
import RibbonText from '../parts/Ribbon/Ribbon';
import styles from './OfflineSection.module.css';

export default function OfflineSection() {
  return (
    <div id="offline" className={styles.Offline}>
      <div className={styles.Offline__Left}><TitleArea/></div>  

      <div className={styles.Offline__Center}>
        <div className={styles.Offline__Block}>
          <ContentBlock
            title="出版イベント"
            subTitle="＠LIGinc. 御徒町オフィス"
            description="2024年に出版した「セイト先生が教えるプログラミング入門」のリリースイベントを株式会社LIGのいいオフィス御徒町にて開催しました！"
          />
          <Event/>
        </div>
        <RibbonText text="OFFLINE" />
        <div className={styles.Offline__Block}>
          <ContentBlock
            title="オフ会"
            description="セイト企画もあれば、有志による企画などもありオフライン上でのコミュニケーションも大切にしています！"
          />
          <OfflineMeeting/>
        </div>
      </div>
      <div className={styles.Offline__Right}></div>
    </div>
  );
}

