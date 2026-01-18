export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationInfo {
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startItem: number;
  endItem: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface PaginationData<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage?: boolean
    hasPrevPage?: boolean
}

export type PageNumber = number | string;

