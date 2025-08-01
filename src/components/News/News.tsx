'use client';

import React, { useState, useRef, useEffect } from 'react';
import NewsArticle from './NewsPost/NewsPost';
import { dummyNews } from './dummyNews';
import styles from './News.module.css';
import useNews from './useNews';


export default function News() {
  const { handleTouchStart, handleTouchMove, handleTouchEnd, currentIndex, isAnimating, prevArticle, nextArticle } = useNews(dummyNews);

  return (
    <section className={styles.News}>
        <h1 className={styles.News__Title}>
            {'\<\/ News \>'}
        </h1>
        <div className={styles.News__Container}>
          <ul 
            className={styles.News__List}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
              {dummyNews.map((news, index) => (
                  <li key={index} className={styles.News__Item}>
                      <NewsArticle dateTime={news.dateTime} title={news.title} />
                  </li>
              ))}
          </ul>
        </div>
        <div className={styles.News__Controls}>
          <button type='button' onClick={prevArticle} className={styles.News__ButtonLeft}>
            <svg width="10" height="10">
              <use href="#leftArrow" />
            </svg>
          </button>
          <button type='button' onClick={nextArticle} className={styles.News__ButtonRight}>
            <svg width="10" height="10">
              <use href="#rightArrow" />
            </svg>
          </button>
        </div>
    </section>
  )
}

