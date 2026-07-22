import React from 'react';

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
      <p
        className={styles.NotFoundHero__Description}
        dangerouslySetInnerHTML={{
          __html: handleStringHTML(pages.notFound.description, true),
        }}
      />
      <div className={styles.NotFoundHero__Corner}>
        <Corner top="0" left="0" position={CornerPosition.TOP_LEFT} />
      </div>
    </div>
  );
}
