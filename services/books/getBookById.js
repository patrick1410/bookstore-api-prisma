import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const getBookById = async (id) => {
  const prisma = new PrismaClient();

  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new NotFoundError("Book", id);
  }
  return book;
};
