import { createClient } from 'microcms-js-sdk';

import { NewsPost } from '@/types/news';

/**
 * SiiD BLOG（microCMS）から「コラム」カテゴリの最新記事を取得する。
 * サーバー側でのみ実行される（API キーはサーバー専用環境変数）。
 *
 * 必要な環境変数（.env.local / Vercel）:
 * - MICROCMS_SERVICE_DOMAIN … `https://XXXX.microcms.io` の XXXX
 * - MICROCMS_API_KEY         … 読み取り用 API キー
 */

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 「コラム」カテゴリのコンテンツ ID（変更予定がないため定数で固定）
const COLUMN_CATEGORY_ID = 'column';

const NEWS_LIMIT = 3;

export async function getNews(): Promise<NewsPost[]> {
  if (!serviceDomain || !apiKey) {
    // 環境変数が未設定の場合はビルドを止めず空配列を返す
    return [];
  }

  const client = createClient({ serviceDomain, apiKey });

  try {
    const data = await client.getList<NewsPost>({
      endpoint: 'blog',
      queries: {
        // categories は複数参照フィールドのため contains で絞り込む
        filters: `categories[contains]${COLUMN_CATEGORY_ID}`,
        orders: '-publishedAt',
        limit: NEWS_LIMIT,
        fields: 'id,title,publishedAt',
      },
      // ISR: 10 分ごとに再検証（再デプロイ不要で最新記事を反映）
      // signal: microCMS 応答が遅延・ハングした場合でも TOP ページの描画を
      //         ブロックしないよう 5 秒でタイムアウト（中断時は下の catch で [] 返却）
      customRequestInit: {
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(5000),
      },
    });
    return data.contents;
  } catch {
    // 取得失敗時も News セクション以外の描画を止めない
    return [];
  }
}
