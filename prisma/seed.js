// Import dependencies
import { PrismaClient } from "@prisma/client";
import bookData from "../data/books.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };

// Create Prisma client
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

// Implement the main function
async function main() {
  const { books } = bookData;
  const { users } = userData;

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
