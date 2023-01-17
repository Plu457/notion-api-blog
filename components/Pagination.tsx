import React from 'react';
import Link from 'next/link';

import { Constant } from 'commons';

interface PaginationProps {
  current: number;
  total: number;
}

const Pagination = ({ current, total }: PaginationProps) => {
  const lastPageNumber = Math.ceil(total / Constant.POSTS_PER_PAGE);

  return (
    <div className="flex gap-1">
      <PaginationButton to={current - 1} disabled={current === 1}>
        &lt;
      </PaginationButton>

      {Array.from(Array(Constant.PAGINATION_RANGE), (_, index) => current - index - 1)
        .reverse()
        .map(pageIndex =>
          pageIndex > 0 ? (
            <PaginationButton key={pageIndex} to={pageIndex}>
              {pageIndex}
            </PaginationButton>
          ) : null,
        )}

      <button className="px-4 py-2 bg-gray-100 rounded-lg">{current}</button>

      {Array.from(Array(Constant.PAGINATION_RANGE), (_, index) => current + index + 1).map(
        pageIndex =>
          pageIndex <= lastPageNumber ? (
            <PaginationButton key={pageIndex} to={pageIndex}>
              {pageIndex}
            </PaginationButton>
          ) : null,
      )}

      <PaginationButton to={current + 1} disabled={current === lastPageNumber}>
        &gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;

interface PaginationButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to: number;
}

const PaginationButton = ({ children, to, disabled = false }: PaginationButtonProps) => {
  return (
    <Link
      href={{
        query: {
          page: to,
        },
      }}
    >
      <button
        disabled={disabled}
        className="px-4 py-2 rounded-lg hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-white"
      >
        {children}
      </button>
    </Link>
  );
};
