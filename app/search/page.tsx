import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllBooks } from "@/lib/actions";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/global/search-bar";
import Header from "@/components/global/header";

export default async function Search() {
  const allBooks: Book[] = await getAllBooks();
  return (
    <div className='relative min-h-screen bg-gradient-to-r from-primary to-secondary w-full'>
      <Header />
      <div className='flex items-center justify-center min-h-screen container mx-auto w-full'>
        <div className='w-full space-y-4 flex justify-center flex-col items-center'>
          <h1 className='text-3xl font-bold text-primary-foreground'>
            Recherchez votre livre préféré
          </h1>
          <React.Suspense
            fallback={<Skeleton className='h-11 w-full rounded-md' />}
          >
            <SearchBar allBooks={allBooks} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
