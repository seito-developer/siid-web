import Link from 'next/link';

import CareerCard from '@/components/CareerPath/CareerCard/CareerCard';
import CareerModalWrapper from '@/components/CareerPath/CareerModalWrapper/CareerModalWrapper';
import Pagination from '@/components/CareerPath/Pagination/Pagination';
import { CareerPathData } from '@/types/career';
import { getCurrentPageData, getPaginationInfo } from '@/utils/pagination';
import { getYouTubeThumbnailUrl } from '@/utils/youtube';

import styles from './CareerPathList.module.css';

export const ITEMS_PER_PAGE = 10;

interface CareerPathListProps {
  careerPathData: CareerPathData[];
  currentPage: number;
  modalId: string | null;
}

export default function CareerPathList({
  careerPathData,
  currentPage,
  modalId,
}: CareerPathListProps) {
  const selectedCareer = modalId
    ? careerPathData.find((item) => item.id === modalId)
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

  const emptySlots = ITEMS_PER_PAGE - currentItems.length;

  return (
    <>
      <section className={styles.CareerPathList}>
        <div className={styles.CareerPathList__Grid}>
          {currentItems.map((item, index) => (
            <CareerCard
              key={item.id}
              id={item.id}
              voice={item.voice}
              title={item.title}
              thumbnailUrl={getYouTubeThumbnailUrl(item.youtubeId)}
              detailContent={item.detailContent}
              tags={item.tags}
              priority={currentPage === 1 && index < 2}
            />
          ))}

          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`empty-slot-${index}`}
              className={styles.CareerPathList__EmptyCard}
              aria-hidden="true"
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={paginationInfo.totalPages}
          hasNextPage={paginationInfo.hasNextPage}
          hasPrevPage={paginationInfo.hasPrevPage}
        />

        <div className={styles.CareerPath__YouTubeLink}>
          <Link
            href="https://www.youtube.com/@programming-siid"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.CareerCard__SurveyLinkAnchor}
          >
            <span className={styles.CareerCard__SurveyText}>
              その他の受講生様実績はこちら
            </span>

            <svg
              width={32}
              height={23}
              viewBox="0 0 29 20"
              className={styles.CareerPath__YouTubeIcon}
            >
              <use href="#youtube" />
            </svg>
          </Link>
        </div>

        <div className={styles.CareerPath__SurveyLink}>
          <Link
            href="https://docs.google.com/document/d/e/2PACX-1vRZv3ro50YWS5LdR3PSGB3b93omPY854misnktTRAOZ7xgIOj9MRQs4TgybkO3kJLSDzUXiQEoDDaJ4/pub"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.CareerCard__SurveyLinkAnchor}
          >
            <span className={styles.CareerCard__SurveyText}>
              過去の卒業生のアンケート内容はこちら
            </span>

            <svg
              width={32}
              height={32}
              className={styles.CareerPath__SurveyIcon}
            >
              <use href="#page-flip" />
            </svg>
          </Link>
        </div>
      </section>

      {selectedCareer && (
        <CareerModalWrapper
          modalId={modalId}
          currentPage={currentPage}
          career={selectedCareer}
        />
      )}
    </>
  );
}
