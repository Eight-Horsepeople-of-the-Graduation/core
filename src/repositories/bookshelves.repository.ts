import { CreateBookshelfDto, SearchQueryDto, UpdateBookshelfDto } from "@dtos";
import prismaClient from "@utils/prisma";
import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "../interfaces/bookshelves.interface";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
} from "../interfaces/books.interface";

export const getAllBookshelves = async (
  searchQueryDto: SearchQueryDto
): Promise<IBookshelfWithUser[]> => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const bookshelves: IBookshelfWithUser[] =
    await prismaClient.bookshelf.findMany({
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
        user: {
          select: { name: true, username: true, profilePicture: true },
        },
        _count: {
          select: { books: true },
        },
      },
      skip,
      take: limit,
    });

  return bookshelves;
};

export const getBookshelfById = async (
  bookshelfId: number
): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf = await prismaClient.bookshelf.findUnique({
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

export const getBookshelvesByUserId = async (
  userId: number
): Promise<IBookshelf[]> => {
  const bookshelves: IBookshelf[] = await prismaClient.bookshelf.findMany({
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
): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf = await prismaClient.bookshelf.findUnique({
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

export const createBookshelf = async (
  data: CreateBookshelfDto
): Promise<IBookshelf> => {
  const bookshelf: IBookshelf = await prismaClient.bookshelf.create({
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
): Promise<IBookshelf> => {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books: IBookWithoutAuthorsAndGenres[] =
    await prismaClient.book.findMany({
      where: {
        id: { in: booksIds },
      },
    });

  const updatedBookshelf: IBookshelf = await prismaClient.bookshelf.update({
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
): Promise<IBookshelf> => {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf: IBookshelf = await prismaClient.bookshelf.update({
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
): Promise<IBookshelf> => {
  const bookshelf: IBookshelf = await prismaClient.bookshelf.update({
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

export const deleteBookshelf = async (
  bookshelfId: number
): Promise<IBookshelfWithoutBooks> => {
  const deletedBookshelf: IBookshelfWithoutBooks =
    await prismaClient.bookshelf.delete({
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
