import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BookPagination } from "@/components/global/book-pagination";
import { getBook, getBookDetails, getBookIds } from "@/lib/actions";

import { Card, CardContent } from "@/components/ui/card";
export default async function Book({
  params,
  searchParams,
}: {
  params: { shelfId: string };
  searchParams: { page?: string };
}) {
  const { shelfId } = params;
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const offset = (page - 1) * limit;

  const { bookIds, hasMore } = await getBookIds(shelfId, limit, offset);
  const books = await getBookDetails(bookIds);

  return (
    <main className='flex flex-col items-center gap-4 pt-28 w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {books.map((book: Book) => (
          <Card key={book.id} className='group max-w-[300px] lg:w-full'>
            <Link
              href={`/book/${book.book.slug}?id=${book.id}`}
              className='absolute inset-0 z-10'
              prefetch={false}
            >
              <span className='sr-only'>View book details</span>
            </Link>
            <CardContent className='flex flex-col h-full'>
              <Image
                src={book.image}
                alt={book.title}
                width={200}
                height={300}
                className='w-full h-[300px] object-contain lg:object-cover rounded-t-lg group-hover:opacity-80 transition-opacity'
              />
              <div className='flex-1 p-4 bg-card text-card-foreground rounded-b-lg'>
                <h3 className='text-lg font-semibold truncate'>{book.title}</h3>
                {book.authors.length > 0 && (
                  <p className='text-sm text-muted-foreground truncate'>
                    De{" "}
                    {book.authors
                      .map((author: Author) => author.name)
                      .join(" et ")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <BookPagination shelfId={shelfId} currentPage={page} hasMore={hasMore} />
    </main>
  );
}
