import prismaClient from "../../../utils/prisma";
import { data } from "../data/genresData.json";

export async function seedGenres(num: number) {
  num = Math.min(num, data.length);
  const currentGenreCount = await prismaClient.genre.count();
  if (currentGenreCount >= num) {
    console.log(
      `Current genre count: ${currentGenreCount} - Skipping seeding..`
    );
    return;
  }

  for (let i = currentGenreCount; i < num; i++) {
    await prismaClient.genre.create({
      data: data[i],
    });
  }

  console.log(`Added extra ${num - currentGenreCount} genres - current count: ${num}..`);
}
