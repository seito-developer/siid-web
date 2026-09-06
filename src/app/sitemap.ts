import { MetadataRoute } from 'next';

import { ITEMS_PER_PAGE } from '@/components/CareerPath/CareerPathList/CareerPathList';
import { SITE_URL, pages } from '@/constants/meta';
import { getCareerPathData } from '@/lib/getCareerPathData';
import { getTotalPages } from '@/utils/pagination';

export default function sitemap(): MetadataRoute.Sitemap {
  // noindex ページは除外: サンクスページ(counseling/complete, counseling-complete, counseling-complete-lp-1)・旧広告LP(lp-1)
  // lp-2 は index させる方針のため含める(docs/spec/07_lp2-renewal.md §11.1)
  const staticPaths = [
    pages.index.url,
    pages.courses.url,
    pages.community.url,
    pages.service.url,
    pages.counseling.url,
    pages.line.url,
    pages.whitePaper.url,
    pages.lp2.url,
  ];

  const totalPages = getTotalPages(getCareerPathData().length, ITEMS_PER_PAGE);
  const careerPathPaths = Array.from(
    { length: totalPages },
    (_, i) => `${pages.careerPath.url}/${i + 1}`,
  );

  return [...staticPaths, ...careerPathPaths].map((path) => ({
    url: `${SITE_URL}${path}`.replace(/\/$/, ''),
    lastModified: new Date(),
  }));
}
