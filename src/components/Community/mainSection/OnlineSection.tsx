import Discord from '../blocks/BlockInner/Discord/Discord';
import Zoom from '../blocks/BlockInner/Zoom/Zoom';
import ContentBlock from '../blocks/ContentBlock/ContentBlock';
import TitleArea from '../blocks/TitleArea/TitleArea';
import RibbonText from '../parts/Ribbon/Ribbon';

import styles from './OnlineSection.module.css';

export default function OnlineSection() {
  return (
    <div id="online" className={styles.Online}>
      <aside className={styles.Online__Left}><TitleArea/></aside>  

      <div className={styles.Online__Center}>
        <section className={styles.Online__Block}>
          <ContentBlock
            iconPass="/images/community/icon-discord.svg"
            alt="Discord"
            description="Discordは常に相談できる体制で、受講生同士で切磋琢磨や、雑談など日々にぎわっています。また、卒業してからも活用してる方も多く、エンジニアのタテヨコのつながりが生まれやすい！"
          />
          <Discord/>
        </section>
        <RibbonText text="ONLINE" />
        <section className={styles.Online__block}>
          <ContentBlock
            iconPass="/images/community/icon-zoom.svg"
            alt="Zoom"
            description="月１回、著名なゲストを招いて対談イベントや交流会を開催しています！その他には、もくもく相談会Zoomを週５日開催！"
          />
          <Zoom/>
        </section>
      </div>
      <div className={styles.Online__Right}></div>
    </div>
  );
}

