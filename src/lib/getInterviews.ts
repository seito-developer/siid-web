import { createClient } from 'microcms-js-sdk';

import { InterviewList, InterviewPost } from '@/types/interview';
import { toInterviewCard } from '@/utils/interview';

/**
 * SiiD BLOG（microCMS）から「受講生様インタビュー」カテゴリの記事を取得する（Issue #75）。
 * TOP の「卒業生の進路」スライダーと /career-path 一覧のデータ源。
 * 環境変数・失敗時の方針は getNews.ts と同じ（未設定・失敗時は空で返し描画を止めない）。
 */
/* eslint-disable no-console */

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 「受講生様インタビュー」カテゴリのコンテンツ ID
const INTERVIEW_CATEGORY_ID = 'interview';

const EMPTY: InterviewList = { contents: [], totalCount: 0 };

type Options = {
  limit: number;
  offset?: number;
};

export async function getInterviews({ limit, offset = 0 }: Options): Promise<InterviewList> {
  if (!serviceDomain || !apiKey) {
    console.error(
      '[getInterviews] microCMS の環境変数が未設定のためインタビュー記事を取得できません。',
      `MICROCMS_SERVICE_DOMAIN=${serviceDomain ? 'set' : 'missing'}`,
      `MICROCMS_API_KEY=${apiKey ? 'set' : 'missing'}`,
    );
    return EMPTY;
  }

  const client = createClient({ serviceDomain, apiKey });

  try {
    const data = await client.getList<InterviewPost>({
      endpoint: 'blog',
      queries: {
        filters: `categories[contains]${INTERVIEW_CATEGORY_ID}`,
        orders: '-publishedAt',
        limit,
        offset,
        fields: 'id,title,publishedAt,eyecatch',
      },
      // ISR: 10 分ごとに再検証。5 秒でタイムアウトし、ページ全体の描画を止めない
      customRequestInit: {
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(5000),
      },
    });
    if (data.totalCount === 0) {
      console.warn(
        `[getInterviews] microCMS から 0 件が返りました（filters: categories[contains]${INTERVIEW_CATEGORY_ID}）。`,
      );
    }
    return {
      contents: data.contents.map(toInterviewCard),
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error('[getInterviews] microCMS からの記事取得に失敗しました:', error);
    return EMPTY;
  }
}
