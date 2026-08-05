import React from 'react';

import Image from 'next/image';

import styles from './LineBanner.module.css';

// セイト先生（公式）LINE 友だち追加の導線 URL
const LINE_ADD_URL =
  'https://siid.bug-fix.org/line/open/WW8PNs3kOtVi?mtid=euzw1NhT9iY3';

const ALT = 'LINE友だち追加でスマホから簡単に体験できる！';

type Props = {
  /** 画像の読み込み優先度（ページ冒頭の1枚目のみ true） */
  priority?: boolean;
};

export default function LineBanner({ priority = false }: Props) {
  return (
    <a
      className={styles.LineBanner}
      href={LINE_ADD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="セイト先生（公式）LINEを友だち追加する">
      <Image
        className={styles.LineBanner__Pc}
        src="/siid/images/line/banner-pc.svg"
        alt={ALT}
        width={1080}
        height={460}
        priority={priority}
        unoptimized
      />
      <Image
        className={styles.LineBanner__Sp}
        src="/siid/images/line/banner-sp.svg"
        alt={ALT}
        width={311}
        height={627}
        priority={priority}
        unoptimized
      />
    </a>
  );
}
