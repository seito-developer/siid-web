import Image from 'next/image';

import styles from './Event.module.css';

export default function Event() {
  return (
    <div className={styles.Event__Wrapper}>
      <div className={styles.Event__Hero}>
        <Image src="/images/community/offline.png" alt="満員御礼" width={800} height={500} className={styles.Event__HeroImg} />
      </div>

      <div className={styles.Event__Detail}>
        <div className={styles.Event__DetailWrap}>
          <Image src="/images/community/seito-01.png" alt="講師登壇" width={400} height={300} className={styles.Event__DetailImg} />
          <div className={styles.Event__DetailText}>
            <p>
              コメント記載できるスペースをこちらに配置しました。特になければトリで大丈夫です。80字程度で何かあれば入れてください。ここには４行程度の文字が入る想定です。
            </p>
          </div>
        </div>

        <div className={styles.Event__DetailRight}>
          <Image src="/images/community/seito-02.png" alt="講師登壇" width={400} height={300} className={styles.Event__RightImg} />
        </div>
      </div>

      <div className={styles.Event__Publication}>
        <Image src="/images/community/seito-book.png" alt="セイト先生が教えるプログラミング入門" width={300} height={400} className={styles.Event__PublicationImg} />
        <div className={styles.Event__PublicationText}>
          <span className={styles.Event__BookTitle}>『セイト先生が教えるプログラミング入門 』</span>
          <span className={styles.Event__BookDetail}>日経BP /2024年9月 発売</span>
          <span className={styles.Event__BookDesc}>
            YouTube登録者数10万人超のインフルエンサーであり、現役エンジニアでもある著者が、効率的な学習法やコンピュータサイエンス、HTML、CSS、JavaScript、アプリケーション開発など、プログラミングにまつわるアレコレをわかりやすく解説しています。ChatGPTや、AI機能を有するIDEであるCursorなど、AIツールの取り入れ方も手厚くカバーしています。<br />
            プログラミング学習はインプットするだけでは不十分で、アウトプットの経験が大切です。本書は演習問題を豊富に用意しており、アウトプットの経験を積むこともできます。
          </span>
          <div className={styles.Event__Links}>
            <span className={styles.Event__DisabledLink}>楽天ブックスで購入する（coming soon）</span>
            <span className={styles.Event__DisabledLink}>Amazonで購入する（coming soon）</span>
          </div>
        </div>
      </div>
    </div>
  );
}
