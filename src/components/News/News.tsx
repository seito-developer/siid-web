import React from 'react'
import NewsArticle from './NewsArticle/NewsArticle';
import { dummyNews } from './dummyNews';
import styles from './News.module.css';

export default function News() {
  return (
    <section className={styles.News}>
        <h1 className={styles.News__Title}>News</h1>
        <ul className={styles.News__List}>
            {dummyNews.map((news, index) => (
                <li key={index}>
                    <NewsArticle dateTime={news.dateTime} title={news.title} />
                </li>
            ))}
        </ul>
    </section>
  )
}

