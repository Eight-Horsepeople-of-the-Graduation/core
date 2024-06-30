import prismaClient from "../../../utils/prisma";
import { Format } from "@prisma/client";
import { data } from "../data/booksData.json";
import { fa, faker } from "@faker-js/faker";
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

export async function seedBooks() {
  console.log("-----------------------------Seeding Books");
  await prismaClient.book.deleteMany();
  console.log("Deleted records in Books table...");

  await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
  console.log("Reset AUTO_INCREMENT in Books table...");

  for (const book of data) {
    const bookFormat =
      book.format == "PAPERBACK"
        ? Format.PAPERBACK
        : book.format == "HARDCOVER"
          ? Format.HARDCOVER
          : Format.EBOOK;

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
    const bookOwners = await prismaClient.user.findMany({
      where: {
        id: {
          in: faker.helpers.arrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
            min: 1,
            max: 5,
          }),
        },
      },
    });
    const bookInput = {
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
    };

    await prismaClient.book.create({
      data: bookInput,
    });
  }

  console.log("Added Books data..");
}
