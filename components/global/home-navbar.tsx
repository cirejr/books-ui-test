import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function HomeNavbar({ shelves }: { shelves: Shelf[] }) {
  return (
    <header className='fixed top-0 w-full bg-primary text-primary-foreground py-4 px-4 md:px-6'>
      <div className='container mx-auto max-w-5xl flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold' prefetch={false}>
          Ebook Library
        </Link>
        <React.Suspense fallback={<NavSkeleton />}>
          <nav className='hidden md:flex items-center space-x-6'>
            {shelves.map((shelf: Shelf) => (
              <Link
                key={shelf.id}
                href={`/books/${shelf.id}`}
                className='font-medium hover:text-muted-foreground'
                prefetch={false}
              >
                {shelf.title}
              </Link>
            ))}
          </nav>
        </React.Suspense>
        <Button variant='outline' className='md:hidden'>
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </div>
    </header>
  );
}

function NavSkeleton() {
  return (
    <nav className={`items-center space-x-6 md:flex`}>
      <Skeleton className='h-4 w-20 rounded-md' />
      <Skeleton className='h-4 w-20 rounded-md' />
      <Skeleton className='h-4 w-32 rounded-md' />
    </nav>
  );
}
