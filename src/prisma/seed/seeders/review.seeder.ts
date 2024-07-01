import prismaClient from "../../../utils/prisma";
import { data } from "../data/reviewsData.json";
import { seedConfig } from "./config";

export async function seedReviews(num: number) {
  const books = await prismaClient.book.findMany();
  num = Math.min(num, Math.min(data.length, seedConfig.userCount));

  console.log(
    "-----------------------------Seeding Reviews---------------------------"
  );

  for (const book of books) {
    for (let i = 1; i <= num; i++) {
      const user = await prismaClient.user.findUniqueOrThrow({
        where: { id: i },
      });
      await prismaClient.review.create({
        data: {
          title: data[i].title,
          description: data[i].description,
          rating: Math.random() * 5,
          bookId: book.id,
          userId: user.id,
        },
      });
    }
  }

  console.log(`Added ${num} reviews..`);
}
