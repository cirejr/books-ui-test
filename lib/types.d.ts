declare interface Shelf {
  id: string;
  slug: string;
  last_modified: number;
  title: string;
  user: User;
}

declare interface User {
  id: string;
  name: string;
  username: string;
  cover: string | null;
  image: string;
}

declare interface Book {
  id: string;
  authors: Author[];
  book: {
    id: string;
    slug: string;
  };
  can: {
    print: boolean;
    access: boolean;
  };
  form: string;
  language: string;
  short_title: string;
  title: string;
  description: string;
  extents: {
    gl_pages: number;
  };
  isbn: string;
  publisher: string;
  tags: string[];
  image: string;
  adult: boolean;
  is_free: boolean;
}

declare interface Author {
  id: string;
  name: string;
  slug: string;
}
/* 
// API response types
export type ShelvesResponse = Shelf[];
export type BookIdsResponse = string[];
export type BookResponse = Book;

// Function types
export type GetShelvesFunction = () => Promise<ShelvesResponse>;
export type GetBooksFunction = (shelfId: string) => Promise<BookIdsResponse>;
export type GetBookFunction = (formId: string) => Promise<BookResponse>;
 */
