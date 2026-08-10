import { createClient } from 'microcms-js-sdk';

import { NewsPost } from '@/types/news';

/**
 * SiiD BLOG（microCMS）から「コラム」カテゴリの最新記事を取得する。
 * サーバー側でのみ実行される（API キーはサーバー専用環境変数）。
 *
 * 必要な環境変数（.env.local / Vercel）:
 * - MICROCMS_SERVICE_DOMAIN … `https://XXXX.microcms.io` の XXXX
 * - MICROCMS_API_KEY         … 読み取り用 API キー
 *
 * 本モジュールはサーバー側専用のため、失敗原因は console に出して
 * Vercel の Runtime Logs から切り分けられるようにしている（Issue #55）。
 */
/* eslint-disable no-console */

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 「コラム」カテゴリのコンテンツ ID（変更予定がないため定数で固定）
const COLUMN_CATEGORY_ID = 'column';

const NEWS_LIMIT = 3;

export async function getNews(): Promise<NewsPost[]> {
  if (!serviceDomain || !apiKey) {
    // 環境変数が未設定の場合はビルドを止めず空配列を返す。
    // 無言で空になると原因の切り分けができない（Issue #55）ため、
    // どちらが欠けているかをサーバーログに残す。
    console.error(
      '[getNews] microCMS の環境変数が未設定のため News を取得できません。',
      `MICROCMS_SERVICE_DOMAIN=${serviceDomain ? 'set' : 'missing'}`,
      `MICROCMS_API_KEY=${apiKey ? 'set' : 'missing'}`,
    );
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
    if (data.contents.length === 0) {
      // 200 が返っていても filters が一致しなければ 0 件になる。
      // 「記事はあるのに表示されない」ケースの切り分け用（Issue #55）。
      console.warn(
        `[getNews] microCMS から 0 件が返りました（filters: categories[contains]${COLUMN_CATEGORY_ID}）。`,
      );
    }
    return data.contents;
  } catch (error) {
    // 取得失敗時も News セクション以外の描画を止めないが、
    // 原因（404: エンドポイント名 / 401: APIキー権限 / タイムアウト等）は必ずログに残す
    console.error('[getNews] microCMS からの記事取得に失敗しました:', error);
    return [];
  }
}
