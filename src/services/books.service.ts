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

export const getBookById = async (id: number) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
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
  format: "HARDCOVER" | "PAPERBACK" | "EBOOK";
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

// update a book
export const updateBook = async (
  id: number,
  updatedData: {
    title: any;
    description: any;
    language: any;
    format: any;
    country: any;
    numOfPages: any;
    publishDate: any;
    authors: any;
    genres: any;
  }
) => {
  const bookId = getBookById(id);
  if (!bookId) throw new Error("Book Not Found");

  const updateBook = await prisma.book.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return updateBook;
};

// delete a book
export const deleteBook = async (id: any) => {
  return await prisma.book.delete({ where: { id } });
};

export default {
  getAllBooks,
  getBook,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
