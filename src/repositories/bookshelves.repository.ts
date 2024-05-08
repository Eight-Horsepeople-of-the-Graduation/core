import prismaClient from "../utils/prisma";
import {
  CreateBookshelfDto,
  GetBookshelvesByIdDto,
  GetBookshelvesByTitleDto,
  UpdateBookshelvesDto,
} from "../dtos/bookshelves.dto";

export const getAllBookshelves = async () => {
  const bookshelves = await prismaClient.bookshelf.findMany({
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
      user: true,
    },
  });

  return bookshelves;
};

export const getBookshelvesByTitle = async (data: GetBookshelvesByTitleDto) => {
  const title = data.title;
  const bookshelves = await prismaClient.bookshelf.findMany({
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

export const getBookshelfById = async (data: GetBookshelvesByIdDto) => {
  const id = data.id;
  const bookshelf = prismaClient.bookshelf.findUnique({
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
  const bookshelves = prismaClient.bookshelf.findMany({
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
  const { title, description, privacy, userId } = data;
  const bookshelf = prismaClient.bookshelf.create({
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

export const updateBookshelf = async (
  id: GetBookshelvesByIdDto,
  updatedData: UpdateBookshelvesDto
) => {
  const bookshelf = prismaClient.bookshelf.update({
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

export const addBooksToBookshelf = async (
  id: GetBookshelvesByIdDto,
  booksIds: number[]
) => {
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf Not Found");
  const books = await prismaClient.book.findMany({
    where: {
      id: {
        in: booksIds,
      },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
    where: {
      id: id.id,
    },
    data: {
      books: {
        connect: books.map((book) => ({ id: book.id })),
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
      id: {
        in: booksIds,
      },
    },
  });

  const updatedBookshelf = await prismaClient.bookshelf.update({
    where: {
      id: id.id,
    },
    data: {
      books: {
        disconnect: books.map((book) => ({ id: book.id })),
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

export const deleteBookshelf = async (id: GetBookshelvesByIdDto) => {
  const deletedBookshelf = prismaClient.bookshelf.delete({
    where: { id: id.id },
  });
  return deletedBookshelf;
};
