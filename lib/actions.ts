"use server";

let apiRoot = process.env.NEXT_PUBLIC_API_ROOT!;

export async function getShelves() {
  const response = await fetch(
    `${apiRoot}/users/5a8411b53ed02c04187ff02a/shelves`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch shelves");
  }
  const data = await response.json();
  return data;
}

export async function getBookIds(
  shelfId: string,
  limit: number = 12,
  offset: number = 0,
) {
  const response = await fetch(
    `${apiRoot}/shelves/${shelfId}/forms?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    return { bookIds: [], hasMore: false };
  }
  const data = await response.json();

  // Check if there might be more books
  const hasMore = data.length === limit;

  return { bookIds: data, hasMore };
}
// Add a delay between batches to avoid overwhelming the server
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch book details with error handling
export async function getBookDetails(bookIds: string[]) {
  const bookDetails: Book[] = [];

  for (const bookId of bookIds) {
    try {
      const bookDetail = await getBook(bookId);
      bookDetails.push(bookDetail);
    } catch (error) {
      console.error(`Failed to fetch book with ID ${bookId}:`, error);
    }
  }

  return bookDetails;
}

// Fetch all books with batching and delay
export async function getAllBooks() {
  const shelves = await getShelves();
  const allBookDetails: Book[] = [];

  for (const shelf of shelves) {
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const { bookIds, hasMore: moreBooks } = await getBookIds(
        shelf.id,
        20, // Reduce batch size
        offset,
      );

      // Fetch book details in smaller batches
      const books = await getBookDetails(bookIds);
      allBookDetails.push(...books);

      offset += bookIds.length;
      hasMore = moreBooks;

      // Add a delay between batches
      await delay(100); // Adjust the delay as needed
    }
  }

  return allBookDetails;
}

export async function getBook(formId: string) {
  const response = await fetch(`${apiRoot}/forms/${formId}`);
  if (!response.ok) {
    console.log("Failed to fetch book", response.status);
  }
  const data = await response.json();
  return data;
}
