import prisma from "../utils/prisma";
import { getBookById } from "../services/books.service";
import {
  CreateDto,
  GetByIdDto,
  GetByTitleDto,
  GetDto,
  UpdateDto,
} from "../dtos/bookshelves.dto";

// a little uneasy about the userId being optional + in the GetDto
export const createBookshelf = async (data: CreateDto) => {
  const { title, userId, description, privacy } = data;
  const bookshelf = await prisma.bookshelf.create({
    include: {
      books: true,
      _count: {
        select: { books: true },
      },
    },
    data: { title, description, privacy, userId },
  });

  return bookshelf;
};

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

export const getBookshelfById = async (data: GetByIdDto) => {
  const { id } = data;
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

export const getBookshelvesByTitle = async (data: GetByTitleDto) => {
  const title = data.title;
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

export const updateBookshelf = async (data: UpdateDto) => {
  const { id, title, description, privacy } = data;
  const updatedData = {
    title,
    description,
    privacy,
  };
  const updatedBookshelf = await prisma.bookshelf.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return updatedBookshelf;
};

export const addBookToBookshelf = async (
  bookId: number, //to be changed into GetByIdDto from books.dto.ts, issue: controller
  id: GetByIdDto
) => {
  const book = await getBookById(bookId);
  if (!book) throw new Error("Book not found");
  const bookshelf = await getBookshelfById(id);
  if (!bookshelf) throw new Error("Bookshelf not found");
  const updatedBookshelf = await prisma.bookshelf.update({
    where: {
      id: id.id,
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
export const deleteBookshelf = async (id: GetByIdDto) => {
  await prisma.bookshelf.delete({
    where: {
      id: id.id,
    },
  });
};
