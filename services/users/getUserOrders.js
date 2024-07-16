import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError.js";

export const getUserOrders = async (userId) => {
  const prisma = new PrismaClient();
  const userOrders = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      orders: true,
    },
  });
  if (!userOrders) {
    throw new NotFoundError("User", userId);
  }
  return userOrders;
};
