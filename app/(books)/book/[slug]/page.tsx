import React from "react";
import Image from "next/image";
import parse from "html-react-parser";

import { getBook } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default async function BookDetails({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = searchParams;
  const book: Book = await getBook(id as string);
  return (
    <div className='grid lg:grid-cols-2 gap-6 lg:gap-12 items-start sm:max-w-6xl sm:px-4 sm:mx-auto py-6 overflow-x-hidden '>
      <React.Suspense
        fallback={
          <Skeleton className='w-[300px] h-[500px] aspect-[2/3] rounded-lg ' />
        }
      >
        <div className='grid gap-4'>
          <Image
            loading='lazy'
            src={book.image}
            alt='Book Cover'
            width={600}
            height={900}
            className='aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden'
          />
        </div>
      </React.Suspense>
      <div className='grid gap-6 mb-20 lg:mb-0'>
        <div className='grid gap-2'>
          <h1 className='font-bold text-3xl lg:text-4xl'>{book.title}</h1>
          <p className='text-muted-foreground'>
            par {book.authors.map((author) => author.name).join(" and ")}
          </p>
        </div>
        <div className='grid gap-4'>
          {parse(book.description)}
          <Button size='lg'>
            {book.can && book.is_free ? "Lire" : "Acheter"}
          </Button>
        </div>
        <div className='grid gap-2 border-t pt-4'>
          <div className='flex gap-3 w-full justify-between'>
            <span className='font-medium'>Tags</span>
            <div className='flex gap-2 flex-wrap justify-end'>
              {book.tags.map((tag, idx) => (
                <Badge key={idx}>{tag}</Badge>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='font-medium'>Langue</span>
            <span>{book.language}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='font-medium'>Nombre de pages</span>
            <span> {book.extents.gl_pages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
