// import recordData from "../../data/records.json" assert { type: "json" };
// import { NotFoundError } from "../../errors/notFoundError.js";

// export const updateRecordById = (id, title, artist, year, available, genre) => {
//   const record = recordData.records.find((record) => record.id === id);

//   if (!record) {
//     throw new NotFoundError("Record", id);
//   }

//   record.title = title ?? record.title;
//   record.artist = artist ?? record.artist;
//   record.year = year ?? record.year;
//   record.available = available ?? record.available;
//   record.genre = genre ?? record.genre;

//   return record;
// };

import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const updateRecordById = async (
  id,
  title,
  artist,
  year,
  available,
  genre
) => {
  const prisma = new PrismaClient();
  const updatedRecord = await prisma.record.updateMany({
    where: {
      id,
    },
    data: {
      title,
      artist,
      year,
      available,
      genre,
    },
  });

  if (!updatedRecord || updatedRecord.count === 0) {
    throw new NotFoundError("Record", id);
  }

  // Return a success message.
  // Because the updateMany doesn't return anything other than the count of the updated objects.
  // This is a tradeoff we have to make for performance optimization.

  return {
    message: `Record with id ${id} was updated!`,
  };
};
