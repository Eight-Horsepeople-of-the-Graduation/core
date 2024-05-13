import prismaClient from "@utils/prisma";
import {
  CreateBookshelfDto,
  GetBookshelvesByIdDto,
  SearchQueryDto,
  UpdateBookshelvesDto,
} from "@dtos";

export const getAllBookshelves = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const bookshelves = await prismaClient.bookshelf.findMany({
    where: {
      ...(term && { title: { contains: term } }),
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

export const getBookshelfById = async (data: GetBookshelvesByIdDto) => {
  const id = data.id;
  const bookshelf = await prismaClient.bookshelf.findUnique({
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
  id: GetBookshelvesByIdDto,
  booksIds: number[]
) => {
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
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
  id: GetBookshelvesByIdDto,
  booksIds: number[]
) => {
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf Not Found");

  const books = await prismaClient.book.findMany({
    where: {
      id: { in: booksIds },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
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
  id: GetBookshelvesByIdDto,
  updatedData: UpdateBookshelvesDto
) => {
  const bookshelf = await prismaClient.bookshelf.update({
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

export const deleteBookshelf = async (id: GetBookshelvesByIdDto) => {
  const deletedBookshelf = await prismaClient.bookshelf.delete({
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
