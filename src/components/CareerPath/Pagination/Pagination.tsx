import Link from 'next/link';

import { PaginationProps } from '@/types/pagination';
import { getPaginationNumbers } from '@/utils/pagination';

import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  const pageNumbers = getPaginationNumbers(currentPage, totalPages, 5);

  return (
    <div className={styles.pagination}>
      {hasPrevPage && (
        <Link
          href={`/career-path/${currentPage - 1}`}
          className={styles.arrowButton}
          aria-label="前のページ"
        >
          <svg className={styles.icon}>
            <use href="#leftArrow" />
          </svg>
        </Link>
      )}

      <div className={styles.pageNumbers}>
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={styles.ellipsis}
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          return (
            <Link
              key={pageNum}
              href={`/career-path/${pageNum}`}
              className={`${styles.pageButton} ${
                pageNum === currentPage ? styles.pageButtonActive : ''
              }`}
              aria-label={`ページ${pageNum}へ移動`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {hasNextPage && (
        <Link
          href={`/career-path/${currentPage + 1}`}
          className={styles.arrowButton}
          aria-label="次のページ"
          scroll={true}
        >
          <svg className={styles.icon}>
            <use href="#rightArrow" />
          </svg>
        </Link>
      )}
    </div>
  );
}