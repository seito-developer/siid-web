import React from 'react';

import styles from './ContentsArea.module.css';

type Props = {
  children: React.ReactNode;
  isSidePadding?: boolean;
};

export default function ContentArea({ children, isSidePadding = true }: Props) {
  return <main className={`${styles.ContentsArea} ${isSidePadding ? styles['ContentsArea--sidePadding'] : ''}`}>{children}</main>;
}
