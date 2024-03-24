import prisma from "../utils/prisma";

// view all books
export const getBooks = async () => {
  const books = await prisma.book.findMany({});
  return books;
};

// view book by title
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

// add a book
export const addBook = async (bookInfo: {
  title: string;
  isbn: string;
  description: string;
  language: string;
  format: "HARDCOVER" | "PAPERBACK" | "EBOOK";
  country: string;
  numOfPages: number;
  publishDate: Date;
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
    },
  });
  return book;
};
