import React from 'react';

import Link from 'next/link';

import { pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import Corner, { CornerPosition } from '../Corner/Corner';

import styles from './NotFoundHero.module.css';

export default function NotFoundHero() {
  return (
    <div className={styles.NotFoundHero}>
      <header className={styles.NotFoundHero__Container}>
        <span className={styles.NotFoundHero__SubTitle}>
          お探しのページは見つかりませんでした
        </span>
        <h1 className={styles.NotFoundHero__Title}>
          404
          <br />
          NOT FOUND
        </h1>
        <Corner top="0" left="-20px" position={CornerPosition.TOP_RIGHT} />
        <Corner
          bottom="-20px"
          right="8px"
          position={CornerPosition.TOP_RIGHT}
        />
      </header>
      <div className={styles.NotFoundHero__Body}>
        <p
          className={styles.NotFoundHero__Description}
          dangerouslySetInnerHTML={{
            __html: handleStringHTML(pages.notFound.description, true),
          }}
        />
        <p className={styles.NotFoundHero__Links}>
          <Link href={pages.index.url} className={styles.NotFoundHero__Link}>
            TOPページへ戻る
          </Link>
          <Link href={pages.counseling.url} className={styles.NotFoundHero__Link}>
            無料カウンセリングを予約する
          </Link>
        </p>
      </div>
      <div className={styles.NotFoundHero__Corner}>
        <Corner top="0" left="0" position={CornerPosition.TOP_LEFT} />
      </div>
    </div>
  );
}
