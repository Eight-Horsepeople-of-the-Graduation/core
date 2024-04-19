import { Author, Genre } from "@prisma/client";
import prisma from "../utils/prisma";

// view all books
export const getAllBooks = async () => {
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

// view book by title
// getBookbyId
export const getBook = async (title: string) => {
  const book = await prisma.book.findFirst({
    where: {
      title: title,
    },
  });

  return book;
};

// add a book
export const createBook = async (bookInfo: {
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
      // to-do: make them retrieved if already present
    },
  });

  return book;
};
