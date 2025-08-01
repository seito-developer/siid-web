import React from 'react'
import styles from './NewsArticle.module.css'

type Props = {
    dateTime: string;
    title: string;
}

export default function NewsArticle({ dateTime, title }: Props) {
  return (
    <article className={styles.NewsArticle}>
        <time className={styles.NewsArticle__date} dateTime={dateTime}>{new Date(dateTime).toLocaleDateString()}</time>
        <h2 className={styles.NewsArticle__title}>{title}</h2>
    </article>
  )
}