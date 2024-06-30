import { faker } from "@faker-js/faker";
import prismaClient from "../../../utils/prisma";
import bookshelves from "../data/bookshelvesData.json";
import { Privacy } from "@prisma/client";
import { seedConfig } from "./config";
export async function seedBookshelves(num: number) {
  num = Math.min(num, bookshelves.data.length);
  console.log(
    "-----------------------------Seeding Bookshelves-----------------------------"
  );
  prismaClient.bookshelf.deleteMany();
  console.log("Deleted records in Bookshelves table...");

  prismaClient.$queryRaw`ALTER SEQUENCE "Bookshelf_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Bookshelves table...");

  // Add bookshelves
  for (const bookshelf of bookshelves.data) {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: {
        id: Math.max(1, Math.floor(Math.random() * (seedConfig.userCount + 1))),
      },
    });
    await prismaClient.bookshelf.create({
      data: {
        title: bookshelf.title,
        description: bookshelf.description,
        privacy: faker.helpers.arrayElement([Privacy.PRIVATE, Privacy.PUBLIC]),
        createdAt: faker.date.soon({ days: 365, refDate: user.joinDate }),
        userId: user.id,
      },
    });
  }

  console.log(`Added ${num} bookshelves..`);
}
