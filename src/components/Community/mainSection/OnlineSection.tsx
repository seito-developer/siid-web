import ImagesArea from '../blocks/BlockInner/BlockInnerDiscord/BlockInnerDiscord';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import TitleArea from '../blocks/SideInfo/SideInfo';
import ZoomContents from '../blocks/BlockInner/BlockInnerZoom/BlockInnerZoom';
import RibbonText from '../parts/Ribbon/Ribbon';

import styles from "./OnlineSection.module.css";

export default function CommunityOnlineSection() {
  return (
    <section id="online" className={styles.section}>
      <aside className={styles.left}><TitleArea/></aside>  

      <div className={styles.center}>
        <section className={styles.block}>
          <ContentBlock
            iconPass="/community/icon-discord.svg"
            alt="Discord"
            description="Discordは常に相談できる体制で、受講生同士で切磋琢磨や、雑談など日々にぎわっています。また、卒業してからも活用してる方も多く、エンジニアのタテヨコのつながりが生まれやすい！"
          />
          <ImagesArea/>
        </section>
        {/* <RibbonText text="ONLINE" repeat={14} /> */}
        <section className={styles.block}>
          <ContentBlock
            iconPass="/community/icon-zoom.svg"
            alt="Zoom"
            description="月１回、著名なゲストを招いて対談イベントや交流会を開催しています！その他には、もくもく相談会Zoomを週５日開催！"
          />
          <ZoomContents/>
        </section>
      </div>
      <div className={styles.right}></div>
    </section>
  );
}

