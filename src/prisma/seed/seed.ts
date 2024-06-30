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

faker.seed(123);

async function main() {
  await seedUsers(20);
  await seedAuthors();
  await seedGenres();
  await seedBooks();
  console.log("Database seeded successfully!");
}
main();
