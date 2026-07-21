import Link from 'next/link';

import { getNews } from '@/lib/getNews';

import styles from './News.module.css';
import NewsCarousel from './NewsCarousel';

export default async function News() {
  const posts = await getNews();

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
        <Link href="https://blog.bug-fix.org" target='_blank'>SiiD Techブログ</Link>
      </div>
    </div>
  );
}
