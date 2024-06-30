import { faker } from "@faker-js/faker";
import {
  seedAuthors,
  seedBooks,
  seedBookshelves,
  seedConversations,
  seedGenres,
  seedMessages,
  seedReadingChallenges,
  seedReviews,
  seedUsers,
} from "./seeders";
import {seedConfig} from "./seeders/config"
faker.seed(123);

async function main() {
  await seedUsers(seedConfig.userCount);
  await seedBooks(seedConfig.bookCount);
  await seedAuthors(seedConfig.authorCount);
  await seedGenres(seedConfig.genreCount);
  await seedBookshelves(seedConfig.bookshelfCount);
  console.log("Database seeded successfully!");
}
main();
