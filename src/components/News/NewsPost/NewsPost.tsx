import React from 'react';

import styles from './NewsPost.module.css';

export type NewsPostProps = {
    dateTime: string;
    title: string;
}

/**
 * publishedAt（ISO 8601 / UTC）を「yyyy/mm/dd」に整形する。
 * タイムゾーンを Asia/Tokyo に固定することで、サーバー（UTC）とクライアント（JST）で
 * 表示がズレる＝Hydration Error になるのを防ぐ。
 */
const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export default function NewsPost({ dateTime, title }: NewsPostProps) {
  const date = new Date(dateTime);
  const formattedDate = Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);

  return (
    <article className={styles.NewsPost}>
      {formattedDate && (
        <time className={styles.NewsPost__date} dateTime={dateTime}>{formattedDate}</time>
      )}
      <p className={styles.NewsPost__title}>{title}</p>
    </article>
  );
}
