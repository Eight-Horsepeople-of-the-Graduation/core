import prismaClient from "../../../utils/prisma";
import { data } from "../data/authorsData.json";

export async function seedAuthors() {
  console.log("-----------------------------Seeding Authors");
  await prismaClient.author.deleteMany();
  console.log("Deleted records in Authors table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Authors table...");

  for (const author of data) {
    await prismaClient.author.create({
      data: author,
    });
  }

  console.log("Added authors data..");
}
