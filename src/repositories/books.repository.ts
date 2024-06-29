import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import prismaClient from "@utils/prisma";

export const getAllBooks = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const books = await prismaClient.book.findMany({
    where: {
      ...(term && {
        title: {
          contains: term,
          mode: "insensitive",
        },
      }),
    },
    skip,
    take: limit,
    include: {
      authors: true,
      genres: true,
    },
  });

  return books;
};

export const getBookById = async (id: number) => {
  const book = await prismaClient.book.findUnique({
    where: { id },
    include: {
      authors: true,
      genres: true,
    },
  });

  return book;
};

export const createBook = async (bookData: CreateBookDto) => {
  const { authors, genres } = bookData;
  const book = await prismaClient.book.create({
    data: {
      ...bookData,
      authors: {
        connect: authors.map((author) => ({ id: author.id })),
      },
      genres: {
        connect: genres.map((genre) => ({ id: genre.id })),
      },
    },
  });

  return book;
};

export const updateBookById = async (id: number, bookData: UpdateBookDto) => {
  const { authors, genres } = bookData;
  const book = await prismaClient.book.update({
    where: { id },
    data: {
      ...bookData,
      authors: {
        set: authors.map((author) => ({ id: author.id })),
      },
      genres: {
        set: genres.map((genre) => ({ id: genre.id })),
      },
    },
  });

  return book;
};

export const deleteBookById = async (id: number) => {
  const book = await prismaClient.book.delete({
    where: { id },
  });

  return book;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
