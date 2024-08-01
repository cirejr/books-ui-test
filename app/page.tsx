import React from "react";

import { getAllBooks, getShelves } from "@/lib/actions";

import HomeNavbar from "@/components/global/home-navbar";
import SearchBar from "@/components/global/search-bar";

export default async function Home() {
  const shelves = await getShelves();
  const allBooks: Book[] = await getAllBooks();

  return (
    <div className='w-full min-h-screen'>
      <HomeNavbar shelves={shelves} />
      <section className='w-full bg-gradient-to-r from-primary to-primary-foreground py-20 px-4 md:px-6 h-[100svh]'>
        <div className='container mx-auto h-full flex justify-center items-center'>
          <div className='grid gap-8 md:grid-cols-2 items-center'>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold text-background md:text-5xl lg:text-6xl'>
                Découvrez votre prochaine grande lecture
              </h1>
              <p className='text-background/80 md:text-lg'>
                Explorez notre vaste collection d'ebooks dans une grande variété
                de genres.
              </p>
              <SearchBar allBooks={allBooks} />
            </div>
            <div className='hidden md:block relative w-full h-[800px]'>
              <div className="absolute top-[30px] left-0 w-1/2 h-1/2 rounded-lg bg-[url('/assets/images/book-bg1.jpg')] bg-cover bg-center -rotate-[20deg] " />
              <div className="absolute top-1/4 right-[-100px] w-1/2 h-1/2 rounded-lg bg-[url('/assets/images/book-bg2.jpg')] bg-cover bg-center rotate-12" />
              <div className="absolute bottom-[-50px] left-[50px] w-1/2 h-1/2 rounded-lg bg-[url('/assets/images/book-bg3.jpg')] bg-cover bg-center -rotate-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
