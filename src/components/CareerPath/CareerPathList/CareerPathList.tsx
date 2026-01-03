'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import CareerCard from '@/components/CareerPath/CareerCard/CareerCard';
import CareerModal from '@/components/CareerPath/CareerModal/CareerModal';
import Pagination from '@/components/CareerPath/Pagination/Pagination';
import { careerPathData } from '@/constants/careerData';
import { getCurrentPageData, getPaginationInfo } from '@/utils/pagination';


import styles from './CareerPathList.module.css';

const ITEMS_PER_PAGE = 4;

export default function CareerPathList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const modalId = searchParams.get('id');

  const selectedCareer = modalId
    ? careerPathData.find(item => item.id === modalId)
    : null;

  const currentItems = getCurrentPageData(
    careerPathData,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const paginationInfo = getPaginationInfo(
    careerPathData.length,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const handleOpen = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id);
    router.push(`?${params}`, { scroll: false });
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');
    router.push(`?${params}`, { scroll: false });
  };


  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className={styles.CareerPathList}>
        <div className={styles.CareerPathList__Grid}>
          {currentItems.map((item) => (
            <CareerCard
              key={item.id}
              {...item}
              onClick={() => handleOpen(item.id)}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={paginationInfo.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={paginationInfo.hasNextPage}
          hasPrevPage={paginationInfo.hasPrevPage}
        />

        <div className={styles.CareerPath__SurveyLink}>
          <a href="#" className={styles.CareerCard__SurveyLinkAnchor}>
            <span className={styles.CareerCard__SurveyText}>過去の卒業生のアンケート内容はこちら</span>
            <Image
              src="/careerPath/page-flip.svg"
              alt="詳細を見る"
              width={32}
              height={32}
              className={styles.CareerPath__SurveyIcon}
            />
          </a>
        </div>
      </section>

      {
        selectedCareer && (
          <CareerModal
            isOpen={!!modalId}
            onClose={handleClose}
            voice={selectedCareer.voice}
            title={selectedCareer.title}
            age={selectedCareer.age}
            sex={selectedCareer.sex}
            course={selectedCareer.course}
            reason={selectedCareer.reason}
            description={selectedCareer.description}
            imageUrl={selectedCareer.imageUrl}
            detailTitle={selectedCareer.detailTitle}
            achievement={selectedCareer.achievement}
            detailContent={selectedCareer.detailContent}
          />
        )
      }

    </>
  );
}