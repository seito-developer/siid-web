import styles from './BlockInnerEvent.module.css';

export default function EventContents() {
  return (
    <section className={styles.event}>
      <div className={styles.hero}>
        <img src="/images/community/offline.png" alt="満員御礼" className={styles.heroImg} />
      </div>

      <div className={styles.detail}>
        <div className={styles.detailWrap}>
          <img src="/images/community/seito-01.png" alt="講師登壇" className={styles.detailImg} />
          <div className={styles.detailText}>
            <p>
              コメント記載できるスペースをこちらに配置しました。特になければトリで大丈夫です。80字程度で何かあれば入れてください。ここには４行程度の文字が入る想定です。
            </p>
          </div>
        </div>

        <div className={styles.detailRight}>
          <img src="/images/community/seito-02.png" alt="講師登壇" className={styles.rightImg} />
        </div>
      </div>

      <div className={styles.publication}>
        <img src="/images/community/seito-book.png" alt="セイト先生が教えるプログラミング入門" className={styles.publicationImg} />
        <div className={styles.publicationText}>
          <span className={styles.bookTitle}>『セイト先生が教えるプログラミング入門 』</span>
          <span className={styles.bookDetail}>日経BP /2024年9月 発売</span>
          <span className={styles.bookDesc}>
            YouTube登録者数10万人超のインフルエンサーであり、現役エンジニアでもある著者が、効率的な学習法やコンピュータサイエンス、HTML、CSS、JavaScript、アプリケーション開発など、プログラミングにまつわるアレコレをわかりやすく解説しています。ChatGPTや、AI機能を有するIDEであるCursorなど、AIツールの取り入れ方も手厚くカバーしています。<br />
            プログラミング学習はインプットするだけでは不十分で、アウトプットの経験が大切です。本書は演習問題を豊富に用意しており、アウトプットの経験を積むこともできます。
          </span>
          <div className={styles.links}>
            <a href="http://" target="_blank" rel="noopener noreferrer">楽天ブックスで購入する</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">Amazonで購入する</a>
          </div>
        </div>
      </div>
    </section>
  )
}