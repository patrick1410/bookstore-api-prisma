import bookData from "../../data/books.json" assert { type: "json" };
import { NotFoundError } from "../../errors/notFoundError.js";

export const deleteBook = (id) => {
  const index = bookData.books.findIndex((book) => book.id === id);

  if (index === -1) {
    throw new NotFoundError("Book", id);
  }

  bookData.books.splice(index, 1);
  return id;
};
