import { Author, Genre } from "@prisma/client";
import prisma from "../utils/prisma";

// view all books
export const getBooks = async () => {
  const books = await prisma.book.findMany({
    include: {
      authors: {
        select: {
          name: true,
        },
      },
      genres: {
        select: {
          title: true,
        },
      },
    },
  });

  return books;
};

// ONE BOOK - technically useless
export const getBook = async (title: string) => {
  try {
    return await prisma.book.findFirst({
      where: {
        title: title,
      },
    });
  } catch (error) {
    console.error("Error finding Book:", error);
  }
};
// MANY BOOKS
export const getManyBooks = async (title: string) => {
  try {
    return await prisma.book.findMany({
      where: {
        title: title,
      },
    });
  } catch (error) {
    console.error("Error finding Book:", error);
  }
};

// add a book
export const addBook = async (bookInfo: {
  title: any;
  isbn: any;
  description: any;
  language: any;
  format: any;
  country: any;
  numOfPages: any;
  publishDate: any;
  authors: Author[];
  genres: Genre[];
}) => {
  const {
    title,
    isbn,
    description,
    language,
    format,
    country,
    numOfPages,
    publishDate,
    authors,
    genres,
  } = bookInfo;

  console.log(bookInfo);
  const book = await prisma.book.create({
    data: {
      title,
      isbn,
      description,
      language,
      format,
      country,
      numOfPages,
      publishDate,
      authors: { create: authors },
      genres: { create: genres },
    },
    include: {
      authors: true,
      genres: true,
      // to-do: make them retrived if already present
    },
  });
  return book;
};
