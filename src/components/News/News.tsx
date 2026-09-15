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
        {/* セクション見出しのため h2。TOP の h1 はメインコピーが持つ(Issue #95) */}
        <h2 className={styles.News__Title}>
          {'\<\/ News \>'}
        </h2>
        {posts.length > 0 ? (
          <NewsCarousel posts={posts} />
        ) : (
          <p className={styles.News__Empty}>現在お知らせはありません。</p>
        )}
      </section>
    </div>
  );
}
