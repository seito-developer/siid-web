import EventContents from '../blocks/BlockInner/BlockInnerEvent/BlockInnerEvent';
import OfflineMeeting from '../blocks/BlockInner/BlockInnerOfflineMeeting/BlockInnerOfflineMeeting';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import TitleArea from '../blocks/TitleArea/TitleArea';
import RibbonText from '../parts/Ribbon/Ribbon';
import styles from "./OfflineSection.module.css";

export default function CommunityOfflineSection() {
  return (
    <section id="online" className={styles.section}>
      <aside className={styles.left}><TitleArea/></aside>  

      <div className={styles.center}>
        <section className={styles.block}>
          <ContentBlock
            title="出版イベント"
            subTitle="＠LIGinc. 御徒町オフィス"
            description="2024年に出版した「セイト先生が教えるプログラミング入門」のリリースイベントを株式会社LIGのいいオフィス御徒町にて開催しました！"
          />
          <EventContents/>
        </section>
        <RibbonText text="OFFLINE" />
        <section className={styles.block}>
          <ContentBlock
            title="オフ会"
            description="セイト企画もあれば、有志による企画などもありオフライン上でのコミュニケーションも大切にしています！"
          />
          <OfflineMeeting/>
        </section>
      </div>
      <div className={styles.right}></div>
    </section>
  );
}

