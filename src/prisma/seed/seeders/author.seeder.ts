import prismaClient from "../../../utils/prisma";
import { data } from "../data/authorsData.json";

export async function seedAuthors(num: number) {
  const currentAuthorCount = await prismaClient.author.count();
  if (currentAuthorCount >= num) return;

  for (let i = currentAuthorCount; i < num; i++) {
    await prismaClient.author.create({
      data: data[i],
    });
  }

  console.log(`Added extra ${num - currentAuthorCount} authors..`);
}
