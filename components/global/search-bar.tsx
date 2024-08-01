"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";

export default function SearchBar({ allBooks }: { allBooks: Book[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const filtered = allBooks.filter((book) =>
      book?.title?.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex items-center rounded-md bg-background/20 px-4 py-2 text-background shadow-sm transition-colors focus-within:bg-background/30'
      >
        <div className='flex-1'>
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
              <>
                <div key={book.id} className='w-full'>
                  <Link
                    href={`/book/${book.book.slug}?id=${book.id}`}
                    className='rounded-md py-1 px-2 my-1 hover:bg-background/20 transition-colors w-full'
                  >
                    {book.title}
                  </Link>
                </div>
              </>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
