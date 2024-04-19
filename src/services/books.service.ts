import { Author, Genre } from "@prisma/client";
import prisma from "../utils/prisma";

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
      // TO-DO: make them retrieved if already present
    },
  });

  return book;
};

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

// view book by id, TO-DO: missing controller and route
export const getBookById = async (bookId: number) => {
  try {
    return await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
  } catch (error) {
    console.error("Error finding Book:", error);
  }
};

//TO-DO

// view book by title

//update book info

//delete book
