import bookData from "../../data/books.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

export const createBook = (title, author, isbn, pages, available, genre) => {
  const newBook = {
    id: uuid(),
    title,
    author,
    isbn,
    pages,
    available,
    genre,
  };

  bookData.books.push(newBook);
  return newBook;
};
