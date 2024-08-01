import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BookPagination({
  shelfId,
  currentPage,
  hasMore,
}: {
  shelfId: string;
  currentPage: number;
  hasMore: boolean;
}) {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/books/${shelfId}?page=${currentPage - 1}`}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href={`/books/${shelfId}?page=${currentPage}`}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {hasMore && (
            <PaginationItem>
              <PaginationNext
                href={`/books/${shelfId}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
