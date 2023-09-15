import { ArrowLeft, ArrowRight } from '@lidofinance/lido-ui';
import React, { FC, useCallback, useMemo, useState } from 'react';

import { PaginationContainer, PaginationItem, PaginationText } from './styles';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
};

type PaginatedDataReturnType<T> = {
  currentPage: number;
  onPageChange: (page: number) => void;
  paginatedData: T[];
};

export const usePaginatedData = <T extends any>(
  data: Array<T>,
  pageSize: number,
): PaginatedDataReturnType<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const pageCount = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, pageCount);
  }, [currentPage, data, pageSize]);

  return {
    currentPage,
    onPageChange: setCurrentPage,
    paginatedData,
  };
};

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}) => {
  const firstPageIndex = 1;
  const pageCount = Math.ceil(totalCount / pageSize);

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const onFirstPageClick = useCallback(
    () => onPageChange(firstPageIndex),
    [onPageChange],
  );

  const onLastPageClick = useCallback(
    () => onPageChange(pageCount),
    [onPageChange, pageCount],
  );

  if (currentPage === 0 || pageCount <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      {firstPageIndex !== pageCount && (
        <>
          <PaginationItem
            disabled={currentPage === firstPageIndex}
            onClick={onPrevious}
            size="xxs"
            variant="outlined"
            color="secondary"
          >
            <ArrowLeft />
          </PaginationItem>
          <PaginationItem
            disabled={currentPage === firstPageIndex}
            onClick={onFirstPageClick}
            size="xxs"
            variant="outlined"
            color="secondary"
          >
            {firstPageIndex}
          </PaginationItem>
        </>
      )}
      <PaginationText
        strong
        size="xxs"
      >{`${currentPage} of ${pageCount}`}</PaginationText>
      {firstPageIndex !== pageCount && (
        <>
          <PaginationItem
            disabled={currentPage === pageCount}
            onClick={onLastPageClick}
            size="xxs"
            variant="outlined"
            color="secondary"
          >
            {pageCount}
          </PaginationItem>
          <PaginationItem
            size="xxs"
            variant="outlined"
            color="secondary"
            disabled={currentPage === pageCount}
            onClick={onNext}
          >
            <ArrowRight />
          </PaginationItem>
        </>
      )}
    </PaginationContainer>
  );
};
