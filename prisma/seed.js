// Import dependencies
import { PrismaClient } from "@prisma/client";
import bookData from "../data/books.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };
import orderData from "../data/orders.json" assert { type: "json" };
import recordData from "../data/records.json" assert { type: "json" };

// Create Prisma client
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

// Implement the main function
async function main() {
  const { books } = bookData;
  const { users } = userData;
  const { orders } = orderData;
  const { records } = recordData;

  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {},
      create: book,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const order of orders) {
    await prisma.order.upsert({
      where: { id: order.id },
      update: {},
      create: order,
    });
  }

  for (const record of records) {
    await prisma.record.upsert({
      where: { id: record.id },
      update: {},
      create: record,
    });
  }
}

// Calling the function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Add "prisma": {"seed": "node ./prisma/seed.js"} in package.json under type: "module"
