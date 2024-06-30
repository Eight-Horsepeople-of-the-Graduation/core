import prismaClient from "../../../utils/prisma";

export async function resetDatabase() {
  // Clear all records in the Bookshelves table
  await prismaClient.bookshelf.deleteMany();
  console.log("Deleted records in Bookshelves table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Bookshelf_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Bookshelves table...");

  // Clear all records in the ReadingChallenges table
  await prismaClient.readingChallenge.deleteMany();
  console.log("Deleted records in Reading Challenges table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "ReadingChallenge_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Reading Challenges table...");

  // Clear all records in the Books table
  await prismaClient.book.deleteMany();
  console.log("Deleted records in Books table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Books table...");

  // Clear all records in the Authors table
  await prismaClient.author.deleteMany();
  console.log("Deleted records in Authors table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Authors table...");


  // Clear all records in the Genres table
  await prismaClient.genre.deleteMany();
  console.log("Deleted records in Genres table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Genres table...");


  // Clear all records in the Users table
  await prismaClient.user.deleteMany();
  console.log("Deleted records in Users table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Users table...");
}
