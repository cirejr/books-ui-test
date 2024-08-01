"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { getAllBooks, getSearchBooks } from "@/lib/actions";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        const initialBooks = await getSearchBooks(20); // Fetch initial 20 books
        setBooks(initialBooks);
        setIsLoading(false);

        // Gradually load more books
        let offset = 20;
        const loadMoreBooks = async () => {
          const moreBooks = await getSearchBooks(20, offset);
          setBooks((prevBooks) => [...prevBooks, ...moreBooks]);
          offset += 20;

          if (moreBooks.length === 20) {
            // Schedule the next batch if more books exist
            setTimeout(loadMoreBooks, 3000); // Adjust delay as needed
          }
        };

        loadMoreBooks();
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setIsLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (books) {
      const filtered = books.filter((book) =>
        book?.title?.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredBooks(filtered);
    }
  };

  if (isLoading) {
    return <Skeleton className='w-full h-12 rounded-md ' />;
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full flex items-center justify-center rounded-md bg-background/20 px-4 py-2 text-background shadow-sm transition-colors focus-within:bg-background/30'
      >
        <div className='flex-1 flex items-center'>
          <SearchIcon />
          <Input
            type='search'
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder='Rechercher des ebooks...'
            className='w-full border-none bg-transparent text-background placeholder:text-background/80 focus:ring-0 focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
          />
        </div>
      </form>
      {filteredBooks.length > 0 && searchTerm !== "" && (
        <ScrollArea className='h-72 w-full mt-4 bg-white/30 rounded-md border backdrop-blur-lg backdrop:[filter:blur(10px)]'>
          <div className='p-4 space-y-2'>
            <h4 className='mb-4 text-xl font-medium leading-none px-2'>
              Résultats
            </h4>
            {filteredBooks.map((book) => (
              <div key={book.id} className='w-full'>
                <Link
                  href={`/book/${book.book.slug}?id=${book.id}`}
                  className='rounded-md py-1 px-2 my-1 hover:bg-background/20 transition-colors w-full'
                >
                  {book.title}
                </Link>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
