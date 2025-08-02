import React from 'react';

import styles from './NewsPost.module.css';

export type NewsPostProps = {
    dateTime: string;
    title: string;
}

export default function NewsPost({ dateTime, title }: NewsPostProps) {
  return (
    <article className={styles.NewsPost}>
      <time className={styles.NewsPost__date} dateTime={dateTime}>{new Date(dateTime).toLocaleDateString()}</time>
      <h1 className={styles.NewsPost__title}>{title}</h1>
    </article>
  );
}