import prisma from "../utils/prisma";
import { getBookById } from "../services/books.service";
import { title } from "process";

//get all
export const getAllBookshelves = async () => {
  const bookshelves = await prisma.bookshelf.findMany({
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
  });

  return bookshelves;
};

//create
export const createBookshelf = async (bookshelfInfo: {
  title: string;
  userId: number;
}) => {
  const { title, userId } = bookshelfInfo;
  const bookshelf = await prisma.bookshelf.create({
    data: { title, userId },
  });

  return bookshelf;
};

//get by id
export const getBookshelfById = async (id: number) => {
  const bookshelf = await prisma.bookshelf.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
  });
  return bookshelf;
};

//get by title
export const getBookshelvesByTitle = async (title: string) => {
  const bookshelves = await prisma.bookshelf.findMany({
    where: {
      title: title,
    },
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
  });
  return bookshelves;
};

// update bookshelf details
export const updateBookshelf = async (
  id: number,
  updatedData: { title: string }
) => {
  const updatedBookshelf = await prisma.bookshelf.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return updatedBookshelf;
};

// update bookshelf by adding a book
export const addBookToBookshelf = async (Ids: {
  bookId: number;
  bookshelfId: number;
}) => {
  const { bookId, bookshelfId } = Ids;
  const book = await getBookById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) {
    throw new Error("Bookshelf not found");
  }
  const updatedBookshelf = await prisma.bookshelf.update({
    where: {
      id: bookshelfId,
    },
    data: {
      books: {
        connect: [
          {
            id: bookId,
          },
        ],
      },
    },
    include: {
      books: true,
    },
  });
  return updatedBookshelf;
};

// delete bookshelf
export const deleteBookshelf = async (bookshelfId: number) => {
  await prisma.bookshelf.delete({
    where: {
      id: bookshelfId,
    },
  });
};
