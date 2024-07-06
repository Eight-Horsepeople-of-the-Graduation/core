import {
  CreateBookshelfDto,
  GetBookshelfByIdDto,
  SearchQueryDto,
  UpdateBookshelfDto,
} from "../dtos";
import prismaClient from "../utils/prisma";
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
  data: GetBookshelfByIdDto
): Promise<OptionalBookshelf> => {
  const id = data.id;
  const bookshelf: OptionalBookshelf = await prismaClient.bookshelf.findUnique({
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
  id: GetBookshelfByIdDto,
  booksIds: number[]
): Promise<IBookshelf> => {
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books: IBookWithoutAuthorsAndGenres[] =
    await prismaClient.book.findMany({
      where: {
        id: { in: booksIds },
      },
    });

  const updatedBookshelf: IBookshelf = await prismaClient.bookshelf.update({
    where: { id: id.id },
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
  id: GetBookshelfByIdDto,
  booksIds: number[]
): Promise<IBookshelf> => {
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf: IBookshelf = await prismaClient.bookshelf.update({
    where: { id: id.id },
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
  id: GetBookshelfByIdDto,
  updatedData: UpdateBookshelfDto
): Promise<IBookshelf> => {
  const bookshelf: IBookshelf = await prismaClient.bookshelf.update({
    where: {
      id: id.id,
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
  id: GetBookshelfByIdDto
): Promise<IBookshelfWithoutBooks> => {
  const deletedBookshelf: IBookshelfWithoutBooks =
    await prismaClient.bookshelf.delete({
      where: { id: id.id },
    });

  return deletedBookshelf;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByUserId,
  createBookshelf,
  addBooksToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
