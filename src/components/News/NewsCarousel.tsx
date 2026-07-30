'use client';

import Link from 'next/link';

import { NewsPost as NewsPostType } from '@/types/news';

import styles from './News.module.css';
import NewsPost from './NewsPost/NewsPost';
import useNews from './useNews';

const BLOG_URL = 'https://blog.bug-fix.org';

type NewsCarouselProps = {
  posts: NewsPostType[];
};

export default function NewsCarousel({ posts }: NewsCarouselProps) {
  const { handleTouchStart, handleTouchMove, handleTouchEnd, currentIndex, isAnimating, prevArticle, nextArticle } = useNews(posts.length);

  return (
    <>
      <div className={styles.News__Container}>
        <ul
          className={styles.News__List}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isAnimating ? 'transform 0.3s ease-in-out' : 'none',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {posts.map((post) => (
            <li key={post.id} className={styles.News__Item}>
              <Link href={`${BLOG_URL}/blog/${post.id}`} target='_blank' className={styles.News__Link}>
                <NewsPost dateTime={post.publishedAt} title={post.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {posts.length > 1 && (
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
      )}
    </>
  );
}
