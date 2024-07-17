// import bookData from "../../data/books.json" assert { type: "json" };
// import { NotFoundError } from "../../errors/notFoundError.js";

// export const updateBookById = (
//   id,
//   title,
//   author,
//   isbn,
//   pages,
//   available,
//   genre
// ) => {
//   const book = bookData.books.find((book) => book.id === id);

//   if (!book) {
//     throw new NotFoundError("Book", id);
//   }

//   book.title = title ?? book.title;
//   book.author = author ?? book.author;
//   book.isbn = isbn ?? book.isbn;
//   book.pages = pages ?? book.pages;
//   book.available = available ?? book.available;
//   book.genre = genre ?? book.genre;

//   return book;
// };

import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const updateBookById = async (
  id,
  title,
  author,
  isbn,
  pages,
  available,
  genre
) => {
  const prisma = new PrismaClient();
  const updatedBook = await prisma.book.updateMany({
    where: {
      id,
    },
    data: {
      title,
      author,
      isbn,
      pages,
      available,
      genre,
    },
  });

  if (!updatedBook || updatedBook.count === 0) {
    throw new NotFoundError("Book", id);
  }

  // Return a success message.
  // Because the updateMany doesn't return anything other than the count of the updated objects.
  // This is a tradeoff we have to make for performance optimization.

  return {
    message: `Book with id ${id} was updated!`,
  };
};
