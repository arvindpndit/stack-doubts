'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface Props {
  searchParams?: string;
  page: number;
  totalPages: number;
}

const AppPagination = ({ searchParams, page, totalPages }: Props) => {
  const router = useRouter();

  const goToPage = (targetPage: number) => {
    const query = new URLSearchParams();

    if (searchParams) {
      query.set('query', searchParams);
    }

    query.set('page', targetPage.toString());
    router.push(`?${query.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageItems = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(3, totalPages);
    } else if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    if (start > 1) {
      pageItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => goToPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (start > 2) {
        pageItems.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    for (let i = start; i <= end; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            className="cursor-pointer"
            onClick={() => goToPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageItems.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      pageItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pageItems;
  };

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => goToPage(page - 1)}
              />
            </PaginationItem>
          )}

          {renderPageNumbers()}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => goToPage(page + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AppPagination;

