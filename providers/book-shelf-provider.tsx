"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllBooks, getShelves } from "@/lib/actions";

type BookShelfContextType = {
  books: Book[];
  shelves: Shelf[];
  isLoading: boolean;
};

const BookShelfContext = createContext<BookShelfContextType | undefined>(
  undefined,
);

export function BookShelfProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksData, shelvesData] = await Promise.all([
          getAllBooks(),
          getShelves(),
        ]);
        setBooks(booksData);
        setShelves(shelvesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <BookShelfContext.Provider value={{ books, shelves, isLoading }}>
      {children}
    </BookShelfContext.Provider>
  );
}

export function useBookShelf() {
  const context = useContext(BookShelfContext);
  if (context === undefined) {
    throw new Error("useBookShelf must be used within a BookShelfProvider");
  }
  return context;
}
