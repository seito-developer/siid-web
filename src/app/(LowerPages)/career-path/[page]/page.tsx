import { Suspense } from 'react';

import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import CareerPathList, { ITEMS_PER_PAGE } from '@/components/CareerPath/CareerPathList/CareerPathList';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { commonTitle, pages } from '@/constants/meta';
import { getCareerPathData } from '@/lib/getCareerPathData';
import { handleStringHTML } from '@/utils/helper';
import { getTotalPages } from '@/utils/pagination';

import styles from './CareerPath.module.css';

export const metadata: Metadata = {
  title: `${pages.careerPath.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.careerPath.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.careerPath.name.ja, url: pages.careerPath.url },
];

interface PageProps {
    params: Promise<{
        page: string;
    }>;
    searchParams: Promise<{
        id?: string;
    }>;
}

export default async function CareerPath({ params, searchParams }: PageProps) {

  const { page } = await params;
  const { id } = await searchParams;

  const careerPathData = getCareerPathData();
  const currentPage = Number(page) || 1;
  const modalId = id || null;

  const totalPages = getTotalPages(careerPathData.length, ITEMS_PER_PAGE);

  if(currentPage < 1 || currentPage > totalPages ||isNaN(currentPage)) {
    redirect('/career-path/1');
  }

  return (
    <div>
      <Headline
        subTitle={pages.careerPath.name.ja}
        title={pages.careerPath.name.en}
        description={handleStringHTML(pages.careerPath.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.CareerPath__Wrapper}>
          <Suspense fallback={<div>Loading...</div>}>
            <CareerPathList
              careerPathData={careerPathData}
              currentPage={currentPage}
              modalId={modalId}
            />
          </Suspense>
        </div>
      </ContentsArea>
    </div>
  );
}