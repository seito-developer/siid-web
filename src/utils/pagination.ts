import { PaginationInfo } from '@/types/pagination';

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};


export const getCurrentPageData = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number,
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const getPaginationInfo = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
): PaginationInfo=> {
  const totalPages = getTotalPages(totalItems, itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    totalPages,
    hasNextPage,
    hasPrevPage,
    startItem,
    endItem,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export function getPaginationNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5,
): (number | string)[] {

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  pages.push(1);

  if (currentPage <= halfVisible + 1) {
    for (let i = 2; i <= maxVisible; i++) {
      pages.push(i);
    }
    if (totalPages > maxVisible) {
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  if (currentPage >= totalPages - halfVisible) {
    pages.push('...');
    for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
      if (i > 1) {
        pages.push(i);
      }
    }
    return pages;
  }

  pages.push('...');
  for (let i = currentPage - halfVisible; i <= currentPage + halfVisible; i++) {
    pages.push(i);
  }
  pages.push('...');
  pages.push(totalPages);

  return pages;
}