import React from 'react';

import Image from 'next/image';

import Eyebrow from '../Eyebrow/Eyebrow';

import styles from './LineHero.module.css';

// セイト先生（公式）LINE 友だち追加の導線 URL
const LINE_ADD_URL =
  'https://siid.bug-fix.org/line/open/WW8PNs3kOtVi?mtid=euzw1NhT9iY3';

export default function LineHero() {
  return (
    <a
      className={styles.LineHero}
      href={LINE_ADD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="セイト先生（公式）LINEを友だち追加する">
      <div className={styles.LineHero__Main}>
        <div className={styles.LineHero__Phone}>
          <Image
            src="/images/line/phone-mockup.png"
            alt="LINEアプリで表示したセイト先生（公式）アカウントの画面"
            width={304}
            height={660}
            priority
          />
        </div>

        <div className={styles.LineHero__Body}>
          <Eyebrow label="Register" variant="light" />
          <h2 className={styles.LineHero__Heading}>
            LINE友だち追加で
            <br />
            スマホから簡単に体験できる！
          </h2>
          <p className={styles.LineHero__Caption}>
            QRコードを読み取っていただくか、「LINE友だちに追加」ボタンからセイト先生のアカウントを友だち追加してください。友だち追加後、トーク内メニューをご確認ください。
          </p>
        </div>
      </div>

      <div className={styles.LineHero__Actions}>
        <div className={styles.LineHero__Qr}>
          <Image
            src="/images/line/qr-code.png"
            alt="セイト先生（公式）LINE友だち追加用QRコード"
            width={360}
            height={360}
          />
        </div>
        <span className={styles.LineHero__Button}>
          <Image
            className={styles.LineHero__ButtonIcon}
            src="/images/line/line-add-icon.png"
            alt=""
            width={160}
            height={100}
          />
          友だち追加
        </span>
      </div>
    </a>
  );
}
