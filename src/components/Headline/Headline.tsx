import React from 'react';

import Corner, { CornerPosition } from '../Corner/Corner';

import styles from './Headline.module.css';

type Props = {
  subTitle: string;
  title: string;
  description: string;
};

export default function Headline({ subTitle, title, description }: Props) {
  return (
    <div className={styles.Headline}>
      <header className={styles.Headline__Container}>
        <span className={styles.Headline__SubTitle}>{subTitle}</span>
        <h1 className={styles.Headline__Title}>{title}</h1>
        <Corner top="0" left="-20px" position={CornerPosition.TOP_RIGHT} />
        <Corner
          bottom="-20px"
          right="8px"
          position={CornerPosition.TOP_RIGHT}
        />
      </header>
      <p
        className={styles.Headline__Description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={styles.Headline__Corner}>
        <Corner top="0" left="0" position={CornerPosition.TOP_LEFT} />
      </div>
    </div>
  );
}
