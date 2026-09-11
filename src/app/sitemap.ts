import { MetadataRoute } from 'next';

import { ITEMS_PER_PAGE } from '@/components/CareerPath/CareerPathList/CareerPathList';
import { SITE_URL, pages } from '@/constants/meta';
import { getInterviews } from '@/lib/getInterviews';
import { getTotalPages } from '@/utils/pagination';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // noindex ページは除外: サンクスページ(counseling/complete, counseling-complete, counseling-complete-lp-1, lp-career/complete)・旧広告LP(lp-1)
  // lp-career は index させる方針のため含める(docs/spec/07_lp-career-renewal.md §11.1)
  const staticPaths = [
    pages.index.url,
    pages.courses.url,
    pages.community.url,
    pages.service.url,
    pages.counseling.url,
    pages.line.url,
    pages.whitePaper.url,
    pages.lpCareer.url,
  ];

  // 件数だけ欲しいので 1 件で問い合わせる。取得失敗時(totalCount=0)も 1 ページ目は必ず載せる
  const { totalCount } = await getInterviews({ limit: 1 });
  const totalPages = Math.max(1, getTotalPages(totalCount, ITEMS_PER_PAGE));
  const careerPathPaths = Array.from(
    { length: totalPages },
    (_, i) => `${pages.careerPath.url}/${i + 1}`,
  );

  return [...staticPaths, ...careerPathPaths].map((path) => ({
    url: `${SITE_URL}${path}`.replace(/\/$/, ''),
    lastModified: new Date(),
  }));
}
