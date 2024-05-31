import bookData from "../../data/books.json" assert { type: "json" };

export const deleteBook = (id) => {
  const index = bookData.books.findIndex((book) => book.id === id);

  if (index === -1) {
    return null;
  }

  bookData.books.splice(index, 1);
  return id;
};
