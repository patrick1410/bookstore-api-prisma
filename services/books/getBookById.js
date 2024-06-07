import bookData from "../../data/books.json" assert { type: "json" };
import { NotFoundError } from "../../errors/notFoundError.js";

export const getBookById = (id) => {
  const book = bookData.books.find((book) => book.id === id);
  if (!book) {
    throw new NotFoundError("Book", id);
  }
  return book;
};
