export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationData<T> {
    items: T[];
    currentPage: number;
    totalPage: number;
    totalItems: number;
}

