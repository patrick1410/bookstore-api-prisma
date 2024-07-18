import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const deleteRecord = async (id) => {
  const prisma = new PrismaClient();

  const deleteRecord = await prisma.record.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteRecord || deleteRecord.count === 0) {
    throw new NotFoundError("Book", id);
  }

  return id;
};
