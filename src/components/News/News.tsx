import Link from 'next/link';

import { NewsPost } from '@/types/news';

import styles from './News.module.css';
import NewsCarousel from './NewsCarousel';

type NewsProps = {
  posts: NewsPost[];
};

export default function News({ posts }: NewsProps) {
  return (
    <div className={styles.News}>
      <section className={styles.News__Inner}>
        <h1 className={styles.News__Title}>
          {'\<\/ News \>'}
        </h1>
        {posts.length > 0 ? (
          <NewsCarousel posts={posts} />
        ) : (
          <p className={styles.News__Empty}>現在お知らせはありません。</p>
        )}
      </section>
      <div className={styles.News__BlogLink}>
        <Link href="https://blog.bug-fix.org" target="_blank" rel="noopener noreferrer">SiiD Techブログ</Link>
      </div>
    </div>
  );
}
