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
) => {
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