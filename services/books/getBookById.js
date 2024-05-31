import bookData from "../../data/books.json" assert { type: "json" };

export const getBookById = (id) => {
  return bookData.books.find((book) => book.id === id);
};
