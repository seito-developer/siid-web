import Link from 'next/link';

import CareerCard from '@/components/CareerPath/CareerCard/CareerCard';
import Pagination from '@/components/CareerPath/Pagination/Pagination';
import type { InterviewCard } from '@/types/interview';
import { BLOG_URL } from '@/utils/interview';
import { getPaginationInfo } from '@/utils/pagination';

import styles from './CareerPathList.module.css';

export const ITEMS_PER_PAGE = 10;

interface CareerPathListProps {
  // 現在ページ分のみ（microCMS 側で offset/limit 済み）
  interviews: InterviewCard[];
  totalCount: number;
  currentPage: number;
}

export default function CareerPathList({
  interviews,
  totalCount,
  currentPage,
}: CareerPathListProps) {
  const paginationInfo = getPaginationInfo(
    totalCount,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const emptySlots = ITEMS_PER_PAGE - interviews.length;

  return (
    <section className={styles.CareerPathList}>
      {interviews.length === 0 ? (
        <p className={styles.CareerPathList__Empty}>
          インタビュー記事を読み込めませんでした。
          <br />
          <Link href={`${BLOG_URL}/category/interview`} target="_blank" rel="noopener noreferrer">
            SiiD BLOG の受講生様インタビュー
          </Link>
          から直接ご覧いただけます。
        </p>
      ) : (
        <div className={styles.CareerPathList__Grid}>
          {interviews.map((interview, index) => (
            <CareerCard
              key={interview.id}
              interview={interview}
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
      )}

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
  );
}
