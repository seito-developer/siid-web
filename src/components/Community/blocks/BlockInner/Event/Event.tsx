import Image from 'next/image';

import { getBooks } from '@/lib/getBooks';

import styles from './Event.module.css';


export default function Event() {
  // 『セイト先生が教えるプログラミング入門』(books.json の先頭)
  const book = getBooks()[0];

  return (
    <div className={styles.Event__Wrapper}>
      <div className={styles.Event__Hero}>
        <Image src="/siid/images/community/offline.webp" alt="満員御礼" width={800} height={500} className={styles.Event__HeroImg} />
      </div>

      <div className={styles.Event__Detail}>
        <div className={styles.Event__DetailWrap}>
          <Image src="/siid/images/community/seito-01.png" alt="講師登壇" width={400} height={300} className={styles.Event__DetailImg} />
          <div className={styles.Event__DetailText}>
            <p>
              出版記念イベントではセイトが登壇し、書籍の裏話や効率的な学習法について直接お話ししました。受講生・卒業生・読者の皆さんが集まり、質疑応答や交流の時間も大いに盛り上がりました。
            </p>
          </div>
        </div>

        <div className={styles.Event__DetailRight}>
          <Image src="/siid/images/community/seito-02.webp" alt="講師登壇" width={400} height={300} className={styles.Event__RightImg} />
        </div>
      </div>

      <div className={styles.Event__Publication}>
        <Image src="/siid/images/community/seito-book.png" alt="セイト先生が教えるプログラミング入門" width={300} height={400} className={styles.Event__PublicationImg} />
        <div className={styles.Event__PublicationText}>
          <span className={styles.Event__BookTitle}>『セイト先生が教えるプログラミング入門 』</span>
          <span className={styles.Event__BookDetail}>日経BP /2024年9月 発売</span>
          <span className={styles.Event__BookDesc}>
            YouTube登録者数10万人超のインフルエンサーであり、現役エンジニアでもある著者が、効率的な学習法やコンピュータサイエンス、HTML、CSS、JavaScript、アプリケーション開発など、プログラミングにまつわるアレコレをわかりやすく解説しています。ChatGPTやAI機能を備えたエディタなど、AIツールの取り入れ方も手厚くカバーしています。<br />
            プログラミング学習はインプットするだけでは不十分で、アウトプットの経験が大切です。本書は演習問題を豊富に用意しており、アウトプットの経験を積むこともできます。
          </span>
          <div className={styles.Event__Links}>
            <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
              Amazonで購入する
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
