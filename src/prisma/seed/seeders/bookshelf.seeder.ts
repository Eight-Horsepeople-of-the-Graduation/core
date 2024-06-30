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
  const books = await prismaClient.book.findMany();

  let count = 0;
  // Add bookshelves
  for (const bookshelf of bookshelves.data) {
    if (count >= num) break;
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
        books: {
          connect: books
            .filter((book) => (Math.random() > 0.5 ? true : false))
            .map((book) => ({ id: book.id })),
        },
      },
    });
    count++;
  }

  console.log(`Added ${num} bookshelves..`);
}
