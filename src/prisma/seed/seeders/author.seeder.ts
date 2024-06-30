import prismaClient from "../../../utils/prisma";
import { data } from "../data/authorsData.json";

export async function seedAuthors(num: number) {
  const currentAuthorCount = await prismaClient.author.count();
  if (currentAuthorCount >= num) {
    console.log(`Current author count: ${currentAuthorCount} - Skipping seeding..`)
    return;
  }

  for (let i = currentAuthorCount; i < Math.min(num, data.length); i++) {
    await prismaClient.author.create({
      data: data[i],
    });
  }

  console.log(`Added extra ${num - currentAuthorCount} authors - current count: ${num}..`);
}
