import { CreateBookshelfDto, SearchQueryDto, UpdateBookshelfDto } from "@dtos";
import prismaClient from "@utils/prisma";

export const getAllBookshelves = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const bookshelves = await prismaClient.bookshelf.findMany({
    where: {
      ...(term && {
        title: {
          contains: term,
          mode: "insensitive",
        },
      }),
    },
    include: {
      books: true,
      user: true,
      _count: {
        select: { books: true },
      },
    },
    skip,
    take: limit,
  });

  return bookshelves;
};

export const getBookshelfById = async (bookshelfId: number) => {
  const bookshelf = await prismaClient.bookshelf.findUnique({
    where: {
      id: bookshelfId,
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

export const getBookshelvesByUserId = async (userId: number) => {
  const bookshelves = await prismaClient.bookshelf.findMany({
    where: {
      user: {
        id: userId,
      },
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

export const getBookshelfByUserId = async (
  userId: number,
  bookshelfId: number
) => {
  const bookshelf = await prismaClient.bookshelf.findUnique({
    where: {
      id: bookshelfId,
      user: {
        id: userId,
      },
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

export const createBookshelf = async (data: CreateBookshelfDto) => {
  const bookshelf = await prismaClient.bookshelf.create({
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
    data: data,
  });

  return bookshelf;
};

export const addBooksToBookshelf = async (
  bookshelfId: number,
  booksIds: number[]
) => {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
    where: { id: bookshelfId },
    data: {
      books: {
        connect: books.map((book: { id: any }) => ({ id: book.id })),
      },
    },
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
  });

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  bookshelfId: number,
  booksIds: number[]
) => {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
    where: { id: bookshelfId },
    data: {
      books: {
        disconnect: books.map((book: { id: any }) => ({ id: book.id })),
      },
    },
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
  });

  return updatedBookshelf;
};

export const updateBookshelf = async (
  bookshelfId: number,
  updatedData: UpdateBookshelfDto
) => {
  const bookshelf = await prismaClient.bookshelf.update({
    where: {
      id: bookshelfId,
    },
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
    data: updatedData,
  });

  return bookshelf;
};

export const deleteBookshelf = async (bookshelfId: number) => {
  const deletedBookshelf = await prismaClient.bookshelf.delete({
    where: { id: bookshelfId },
  });

  return deletedBookshelf;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByUserId,
  getBookshelfByUserId,
  createBookshelf,
  addBooksToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
