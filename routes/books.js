import express from "express";

import { getBooks } from "../services/books/getBooks.js";
import { getBookById } from "../services/books/getBookById.js";
import { createBook } from "../services/books/createBook.js";
import { updateBookById } from "../services/books/updateBookById.js";
import { deleteBook } from "../services/books/deleteBook.js";

import { checkJwt } from "../middleware/advancedAuth.js";

import { notFoundErrorHandler } from "../middleware/notFoundErrorHandler.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = await getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of books!");
  }
});

// router.get("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = getBookById(id);

//     if (!book) {
//       res.status(404).send(`Book with id ${id} was not found!`);
//     } else {
//       res.status(200).json(book);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong while getting book by id!");
//   }
// });

// Errors coming from async functions, we have to send the error to the middleware via the built-in next function of our Express route next(error).
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await getBookById(id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res) => {
  const { title, author, isbn, pages, available, genre } = req.body;
  const newBook = await createBook(
    title,
    author,
    isbn,
    pages,
    available,
    genre
  );
  res.status(201).json(newBook);
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, author, isbn, pages, available, genre } = req.body;
      const updatedBook = await updateBookById(
        id,
        title,
        author,
        isbn,
        pages,
        available,
        genre
      );
      res.status(200).json(updatedBook);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBookId = await deleteBook(id);

      res.status(200).json({
        message: `Book with id ${deletedBookId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
