'use client';


import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
      scrollTop();
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
      scrollTop();
    }
  };

  return (
    <div className={styles.pagination}>
      {hasPrevPage && (
        <button
          onClick={handlePrevPage}
          className={styles.arrowButton}
          aria-label="前のページ"
        >
          <svg className={styles.icon}>
            <use href='#leftArrow'/>
          </svg>
        </button>
      )}

      <div className={styles.pageNumbers}>
        {pageNumbers.map((pageNum) => (
          <span
            key={pageNum}
            className={`${styles.pageButton} ${
              pageNum === currentPage ? styles.pageButtonActive : ''
            }`}
            aria-label={`ページ${pageNum}へ移動`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </span>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={handleNextPage}
          className={styles.arrowButton}
          aria-label="次のページ"
        >
          <svg className={styles.icon}>
            <use href='#rightArrow'/>
          </svg>
        </button>
      )}
    </div>
  );
}