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
import { resetDatabase } from "./seeders/utils";
import { seedConfig } from "./seeders/config";
faker.seed(123);

async function main() {
  try {
    await resetDatabase();
    await seedUsers(seedConfig.userCount);
    await seedBooks(seedConfig.bookCount);
    await seedAuthors(seedConfig.authorCount);
    await seedGenres(seedConfig.genreCount);
    await seedBookshelves(seedConfig.bookshelfCount);
    await seedReadingChallenges(seedConfig.readingChallengeCount);
    await seedReviews(seedConfig.reviewCount);
    await seedConversations();
    await seedMessages();
    console.log("Database seeded successfully!");
  } catch (e) {
    console.error(e);
  }
}

main();
