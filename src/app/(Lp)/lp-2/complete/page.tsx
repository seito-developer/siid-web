import { Metadata, Viewport } from 'next';

import Link from 'next/link';

import CanvasScale from '@/components/Lp2/CanvasScale/CanvasScale';
import CookieBanner from '@/components/Lp2/CookieBanner/CookieBanner';
import Footer from '@/components/Lp2/Footer/Footer';
import Header from '@/components/Lp2/Header/Header';
import { lp2Asset } from '@/constants/lp2Assets';
import { buildPageMetadata, pages } from '@/constants/meta';

import { barlowSemiCondensedLp2, jostLp2 } from '../../fonts';
import baseStyles from '../Lp2.module.css';

import styles from './Complete.module.css';
import '../lp2-tokens.css';

export const metadata: Metadata = buildPageMetadata(pages.counselingCompleteLp2, {
  noindex: true,
  ogpImagePath: '/images/lp-2/ogp.png',
});

export const viewport: Viewport = {
  themeColor: '#131a3e', width: 'device-width', initialScale: 1,
};

export default function Complete() {
  return (
    <div className={`lp2 ${jostLp2.variable} ${barlowSemiCondensedLp2.variable} ${baseStyles.Lp2} ${styles.Complete}`}>
      <CanvasScale />
      <Header lpHref={lp2Asset(pages.lp2.url)} />
      <main className={styles.Complete__Main}>
        <div className={styles.Complete__Inner}>
          <div className={styles.Complete__Intro}>
            <span className={styles.Complete__Check} aria-hidden="true">
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <path d="m12 24 8 8 16-17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className={styles.Complete__Eyebrow}>THANK YOU</p>
            <h1>無料カウンセリングの<br /><span>ご予約が完了しました</span></h1>
            <p className={styles.Complete__Lead}>ご予約ありがとうございます。<br />あなたのこれからについて、お話しできることを楽しみにしています。</p>
          </div>

          <section className={styles.Complete__Card} aria-labelledby="next-title">
            <div className={styles.Complete__CardHeading}>
              <p className={styles.Complete__Eyebrow}>NEXT STEPS</p>
              <h2 id="next-title">当日までのご案内</h2>
            </div>
            <ol className={styles.Complete__Steps}>
              <li>
                <span className={styles.Complete__Number} aria-hidden="true">01</span>
                <div><h3>確認メールをご確認ください</h3>
                  <p>ご予約の日時と<strong>ZoomのURL</strong>をメールでお送りしました。メールを保管し、<strong>当日はご予約のお時間に、記載のURLからご参加ください。</strong></p>
                  <p className={styles.Complete__Note}>メールが見当たらない場合は、迷惑メールフォルダもご確認ください。</p>
                  <ul className={styles.Complete__Tags}><li>オンライン</li><li>60〜90分</li><li>参加費無料</li></ul>
                </div>
              </li>
              <li>
                <span className={styles.Complete__Number} aria-hidden="true">02</span>
                <div><h3>当日までにできればこちらの動画をご覧ください</h3>
                  <p>お時間があれば、受講生との対談動画を2〜3本ご覧ください。学び方や転職後の姿をイメージするヒントに。</p>
                  <a className={styles.Complete__VideoLink} href="https://www.youtube.com/@programming-siid" target="_blank" rel="noopener noreferrer">SiiDのYouTubeを見る <span aria-hidden="true">↗</span><span className={baseStyles.srOnly}>（新しいタブで開きます）</span></a>
                </div>
              </li>
            </ol>
          </section>

          <section className={styles.Complete__Help} aria-labelledby="help-title">
            <h2 id="help-title">ご予約の変更・キャンセルについて</h2>
            <p>ご都合が変わった場合や、確認メールが届かない場合は、<br className={styles.Complete__PcBreak} />お問い合わせフォームよりご連絡ください。</p>
            <a href="https://bug-fix.org/contact" target="_blank" rel="noopener noreferrer">お問い合わせ・変更のご連絡 <span aria-hidden="true">↗</span><span className={baseStyles.srOnly}>（新しいタブで開きます）</span></a>
          </section>
          <Link className={styles.Complete__Back} href={pages.lp2.url}>SiiDの紹介ページへ戻る <span aria-hidden="true">→</span></Link>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
