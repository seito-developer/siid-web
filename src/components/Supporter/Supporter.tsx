'use client';

import useIsPc from '@/hooks/useIsPc';

import BookCard from './BookCard/BookCard';
import Decoration from './Decoration/Decoration';
import DecorationPc from './DecorationPc/DecorationPc';
import SubSupporterCard from './SubSupporterCard/SubSupporterCard';
import styles from './Supporter.module.css';

export default function Supporter() {
  const isPc = useIsPc();
  const books = [
    {
      title: '『セイト先生が教える\nプログラミング入門 』',
      publisher: '日経BP',
      date: '2024年9月発売',
      imageUrl: '/images/supporter/bookcard/programming.png',
      link: '#',
      width: 501,
      height: 643,
    },
    {
      title: '『最強のCSS設計』',
      publisher: 'SBクリエイティブ',
      date: '2015年9月発売',
      imageUrl: '/images/supporter/bookcard/css.png',
      link: '#',
      width: 372,
      height: 442,
    },
  ] as const;

  const subSupporters = [
    {
      id: '002',
      name: 'わたけん',
      englishName: 'Wataken',
      role: 'フルスタックエンジニア',
      avatarUrl: '/images/supporter/subsupportercard/wataken.svg',
      socialLinks: {
        x: 'https://x.com/',
        github: 'https://github.com/',
      },
    },
    {
      id: '003',
      name: 'ありけん',
      englishName: 'Ariken',
      role: 'メガベンチャー研修講師',
      avatarUrl: '/images/supporter/subsupportercard/ariken.svg',
      socialLinks: {
        x: 'https://x.com/',
        youtube: 'https://youtube.com/',
      },
    },
    {
      id: '004',
      name: 'たかこ',
      englishName: 'Takako',
      role: '学習アドバイザー',
      avatarUrl: '/images/supporter/subsupportercard/takako.svg',
      socialLinks: {
        x: 'https://x.com/',
        github: 'https://github.com/',
        note: 'https://note.com/',
      },
    },
  ] as const;

  return (
    <div className={styles.Supporter}>
      <div className={styles.Supporter__Container}>
        <div className={styles.Supporter__Title}>{'</ Supporter >'}</div>
        <h2 className={styles.Supporter__Heading}>講師陣紹介</h2>

        <div className={`${styles.Supporter__Decoration} ${styles.Supporter__DecorationStart}`}>{isPc ? <DecorationPc /> : <Decoration />}</div>

        {/* メインサポーター：001 堀口セイト */}
        <div className={styles.Supporter__Main}>
          <div className={styles.MainSupporter__Header}>
            <div className={styles.MainSupporter__HeaderContainer}>
              <div className={styles.MainSupporter__Badge}>
                <div className={styles.MainSupporter__BadgeLabel}>サポート講師</div>
                <div className={styles.MainSupporter__BadgeNumber}>001</div>
              </div>

              <div className={styles.MainSupporter__Avatar}></div>

              <div className={styles.MainSupporter__EnglishName}>
                Seito
                <br />
                Horiguchi
              </div>
            </div>
          </div>
          <div className={styles.MainSupporter__NameContainer}>
            <h3 className={styles.MainSupporter__Name}>
              <span className={styles.MainSupporter__NameRole}>SiiD代表講師</span>
              <span className={styles.MainSupporter__NameText}>堀口セイト</span>
            </h3>

            <div className={styles.MainSupporter__Social}>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg width="24" height="24">
                  <use href="#x" />
                </svg>
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="25" height="28">
                  <use href="#tiktok" />
                </svg>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="30" height="30">
                  <use href="#instagram" />
                </svg>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="29" height="20">
                  <use href="#youtube" />
                </svg>
              </a>
            </div>
          </div>

          <p className={styles.MainSupporter__Bio}>
            学生時代にプログラミングに出会い、Webサイトを作るなどその面白さにハマる。
            <br />
            2012年に大学を卒業後、株式会社LIGにてWebデザイナー・Webエンジニアを3年務めたあと、フィリピン・セブ島にて株式会社LIG Philippinesを立ち上げ、代表・VPoEとして6年間の在籍中に社員数約100名程度のテックチームへ成長させる。
            <br />
            その後2021年に独立し、合同会社BugFixを設立。アプリケーション開発、技術顧問、プログラミング・ITスキル研修を行う傍ら、自身のYouTubeチャンネル「セイト先生のWeb・ITエンジニア転職ラボ」では、プログラミング講座やWeb・IT業界のキャリア情報などを幅広く発信中。
            <br />
            総フォロワー数は約13万人で、現役エンジニアでもある。
          </p>

          {/* 書籍カード */}
          <div className={styles.MainSupporter__Books}>
            {books.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>

        {/* サブサポーター：002, 003, 004... */}
        <ul className={styles.Supporter__SubList}>
          {subSupporters.map(supporter => (
            <li key={supporter.id} className={styles.Supporter__SubItem}>
              <SubSupporterCard {...supporter} />
            </li>
          ))}
        </ul>

        <div className={styles.Supporter__More}>
          <span className={styles.Supporter__MoreButton}>and more...</span>
        </div>

        <div className={`${styles.Supporter__Decoration} ${styles.Supporter__DecorationEnd}`}>{isPc ? <DecorationPc /> : <Decoration />}</div>
      </div>
    </div>
  );
}
