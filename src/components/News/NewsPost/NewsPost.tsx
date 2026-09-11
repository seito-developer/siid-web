import React from 'react';

import { formatPublishedDate } from '@/utils/date';

import styles from './NewsPost.module.css';

export type NewsPostProps = {
    dateTime: string;
    title: string;
}

export default function NewsPost({ dateTime, title }: NewsPostProps) {
  const formattedDate = formatPublishedDate(dateTime);

  return (
    <article className={styles.NewsPost}>
      {formattedDate && (
        <time className={styles.NewsPost__date} dateTime={dateTime}>{formattedDate}</time>
      )}
      <p className={styles.NewsPost__title}>{title}</p>
    </article>
  );
}
