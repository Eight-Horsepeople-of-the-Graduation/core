import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "../dtos";
import prismaClient from "../utils/prisma";

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
    include: {
      authors: true,
      genres: true,
    },
    skip,
    take: limit,
  });

  return books;
};

export const getBookById = async (id: number) => {
  const book = await prismaClient.book.findUnique({
    where: {
      id: id,
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
        connect: genres.map((genres) => ({ id: genres.id })),
      },
    },
  });

  return book;
};

export const updateBookById = async (
  id: number,
  updatedData: UpdateBookDto
) => {
  const { authors, genres } = updatedData;
  const user = await prismaClient.book.update({
    where: { id },
    data: {
      ...updatedData,
      authors: {
        connect: authors.map((author) => ({ id: author.id })),
      },
      genres: {
        connect: genres.map((genres) => ({ id: genres.id })),
      },
    },
  });

  return user;
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
