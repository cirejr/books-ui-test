import React from "react";

interface SearchResultsProps {
  books: Book[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SearchResults({
  books,
  total,
  currentPage,
  onPageChange,
}: SearchResultsProps) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.short_title}</h2>
          <p>{book.description}</p>
        </div>
      ))}
      <Pagination
        total={total}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function Pagination({
  total,
  currentPage,
  onPageChange,
}: {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / 10); // Assuming 10 items per page

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
