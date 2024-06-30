import prismaClient from "../../../utils/prisma";
import { Format } from "@prisma/client";
import { data } from "../data/booksData.json";
import { faker } from "@faker-js/faker";
import { readFileSync } from "fs";
import { seedConfig } from "./config";
import { range } from "lodash";

function generateISBN13() {
  let isbn = "978"; // ISBN-13 prefix for books
  for (let i = 0; i < 9; i++) {
    isbn += Math.floor(Math.random() * 10);
  }
  let checksum = 0;
  for (let i = 0; i < 12; i++) {
    checksum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
  }
  checksum = (10 - (checksum % 10)) % 10;
  isbn += checksum;
  return isbn;
}

function getDesc(genre: string) {
  const genresData = readFileSync(
    "src/prisma/seed/data/genresData.json",
    "utf-8"
  );
  const genres = JSON.parse(genresData);
  return genres.data.filter((g: any) => g.title === genre)[0].description;
}

export async function seedBooks(num: number) {
  num = Math.min(num, data.length);
  console.log("-----------------------------Seeding Books, Authors, Genres-----------------------------");
  await prismaClient.book.deleteMany();
  console.log("Deleted records in Books table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Books table...");

  await prismaClient.author.deleteMany();
  console.log("Deleted records in Authors table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Authors table...");

  await prismaClient.genre.deleteMany();
  console.log("Deleted records in Genres table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Genres table...");


  // Add genres and authors of the desired books
  let count = 0;
  for (const book of data) {
    if (count >= num) break;
    for (const genre of book.genres) {
      const desc = getDesc(genre);
      await prismaClient.genre.upsert({
        where: { title: genre },
        update: {},
        create: {
          title: genre,
          description: desc,
        },
      });
    }

    for (const author of book.authors) {
      const _author = await prismaClient.author.findFirst({
        where: { name: author },
      });
      if (!_author) {
        await prismaClient.author.create({
          data: {
            name: author,
          },
        });
      }
    }
    count++;
  }


  // Add books
  count = 0;
  for (const book of data) {
    if (count >= num) break;


    const bookFormat =
      book.format == "PAPERBACK"
        ? Format.PAPERBACK
        : book.format == "HARDCOVER"
          ? Format.HARDCOVER
          : Format.EBOOK;
    
    // Get random users as owners
    const bookOwners = await prismaClient.user.findMany({
      where: {
        id: {
          in: faker.helpers.arrayElements(range(1, seedConfig.userCount)),
        },
      },
    });

    // Get authors and genres
    const bookAuthors = await prismaClient.author.findMany({
      where: {
        name: {
          in: book.authors,
        },
      },
    });
    const bookGenres = await prismaClient.genre.findMany({
      where: {
        title: {
          in: book.genres,
        },
      },
    });


    // Add book
    await prismaClient.book.create({
      data: {
        title: book.title,
        isbn: "9999999999999" ? generateISBN13() : book.isbn,
        description: book.description,
        publishDate: new Date(book.publishDate || "1000-01-01"),
        format: bookFormat,
        language: book.language,
        country: book.country,
        numOfPages: book.numOfPages == "" ? -1 : parseInt(book.numOfPages),
        pdfLink: book.pdfLink,
        coverPicture: book.coverPicture,
        authors: {
          connect: bookAuthors.map((author) => ({ id: author.id })),
        },
        genres: {
          connect: bookGenres.map((genre) => ({ id: genre.id })),
        },
        owners: {
          connect: bookOwners.map((owner) => ({ id: owner.id })),
        },
      },
    });

    count++;
  }

  console.log(`Added ${num} Books along with their respective genres and authors..`);
}
