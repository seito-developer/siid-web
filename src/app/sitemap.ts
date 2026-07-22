import { MetadataRoute } from 'next';

import { ITEMS_PER_PAGE } from '@/components/CareerPath/CareerPathList/CareerPathList';
import { SITE_URL, pages } from '@/constants/meta';
import { getCareerPathData } from '@/lib/getCareerPathData';
import { getTotalPages } from '@/utils/pagination';

export default function sitemap(): MetadataRoute.Sitemap {
  // サンクスページ(counseling/complete)は noindex のため除外
  const staticPaths = [
    pages.index.url,
    pages.courses.url,
    pages.community.url,
    pages.service.url,
    pages.counseling.url,
    pages.line.url,
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
