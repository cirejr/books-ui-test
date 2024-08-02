"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MenuIcon, X } from "lucide-react"; // X for the close icon
import { Skeleton } from "../ui/skeleton";

export default function HomeNavbar({ shelves }: { shelves: Shelf[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='fixed top-0 w-full bg-primary text-primary-foreground py-4 px-4 md:px-6'>
      <div className='container mx-auto max-w-5xl flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold' prefetch={false}>
          Ebook Library
        </Link>
        <React.Suspense fallback={<NavSkeleton />}>
          <nav className={`hidden md:flex items-center space-x-6`}>
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
        <Button
          variant='outline'
          className='md:hidden'
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
        >
          {isMenuOpen ? (
            <X className='h-6 w-6' color='black' />
          ) : (
            <MenuIcon className='h-6 w-6' color='black' />
          )}
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          id='mobile-menu'
          className='flex flex-col md:hidden space-y-4 mt-4 bg-primary px-4 py-2'
        >
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
      )}
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
