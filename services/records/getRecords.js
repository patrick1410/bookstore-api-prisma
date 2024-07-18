import { PrismaClient } from "@prisma/client";

export const getRecords = async (artist, genre, available) => {
  const prisma = new PrismaClient();

  return prisma.record.findMany({
    where: {
      artist,
      genre,
      available,
    },
  });
};
