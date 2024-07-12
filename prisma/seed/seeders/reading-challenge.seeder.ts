import { faker } from "@faker-js/faker";
import prismaClient from "../../../src/common/utils/prisma";
import { data } from "../data/readingChallengesData.json";
import { ReadingChallengeType } from "@prisma/client";
import { seedConfig } from "./config";
import {
  getEndDate,
  getTimeframe,
} from "../../../src/common/utils/dates-utils";

export async function seedReadingChallenges(num: number) {
  num = Math.min(num, 1);
  num = Math.max(num, 3);
  console.log(
    "-----------------------------Seeding Reading Challenges----------------",
  );

  for (let id = 1; id <= seedConfig.userCount; id++) {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: { id },
    });

    //Get Random Type
    const types = faker.helpers.arrayElements(
      [
        ReadingChallengeType.WEEKLY,
        ReadingChallengeType.MONTHLY,
        ReadingChallengeType.ANNUAL,
      ],
      num,
    );

    for (const type of types) {
      const startDate = faker.date.soon({ days: 365, refDate: user.joinDate });
      const endDate = getEndDate(startDate, type);
      const goal = Math.min(
        Math.min(5, seedConfig.bookCount),
        Math.floor(Math.random() * seedConfig.bookCount) + 1,
      );
      const progress = Math.min(
        Math.floor(goal / 3),
        Math.floor(Math.random() * goal) + 1,
      );

      await prismaClient.readingChallenge.create({
        data: {
          title: faker.helpers.arrayElement(data).title,
          timeframe: getTimeframe(startDate, type),
          type,
          startDate,
          books: {
            connect: faker.helpers
              .arrayElements(
                Array.from({ length: seedConfig.bookCount }, (_, i) => i + 1),
                progress,
              )
              .map((bookId) => ({ id: bookId })),
          },
          userId: user.id,
          progress,
          goal,
          endDate,
          hasEnded: new Date(endDate) < new Date(),
        },
      });
    }
  }

  console.log(
    `Added ${num} reading challenges for all ${seedConfig.userCount} users..`,
  );
}
