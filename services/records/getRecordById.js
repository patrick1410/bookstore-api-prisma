// import recordData from "../../data/records.json" assert { type: "json" };
// import { NotFoundError } from "../../errors/notFoundError.js";

// export const getRecordById = (id) => {
//   const record = recordData.records.find((record) => record.id === id);
//   if (!record) {
//     throw new NotFoundError("Record", id);
//   }
//   return record;
// };

import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const getRecordById = async (id) => {
  const prisma = new PrismaClient();

  const record = await prisma.record.findUnique({
    where: {
      id,
    },
  });

  if (!record) {
    throw new NotFoundError("Record", id);
  }
  return record;
};
