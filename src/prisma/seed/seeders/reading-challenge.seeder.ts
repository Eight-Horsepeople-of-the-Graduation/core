import { faker } from "@faker-js/faker";
import prismaClient from "../../../utils/prisma";
import { data } from "../data/readingChallengesData.json";
import { ReadingChallengeType } from "@prisma/client";
import { seedConfig } from "./config";
export async function seedReadingChallenges(num: number) {
  num = Math.min(num, data.length);
  console.log("-----------------------------Seeding Reading Challenges----------------");

  for (let i = 0; i < num; i++) {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: {
        id: Math.max(1, Math.floor(Math.random() * (seedConfig.userCount + 1))),
      },
    });

    const books = await prismaClient.book.findMany();
    const bookNum = Math.floor(Math.random() * books.length) + 1;
    await prismaClient.readingChallenge.create({
      data: {
        title: data[i].title,
        type: faker.helpers.arrayElement([
          ReadingChallengeType.WEEKLY,
          ReadingChallengeType.MONTHLY,
          ReadingChallengeType.ANNUAL,
        ]),
        startDate: faker.date.soon({ days: 365, refDate: user.joinDate }),
        books: {
          connect: faker.helpers
            .arrayElements(books, bookNum)
            .map((book) => ({ id: book.id })),
        },
        userId: user.id,
        progress: Math.floor(Math.random() * bookNum),
      },
    });
  }

  console.log(`Added ${num} reading challenges..`);
}
