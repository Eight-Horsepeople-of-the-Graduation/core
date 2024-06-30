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

export const getBookById = async (bookId: number) => {
  const book = await prismaClient.book.findUnique({
    where: { id: bookId },
    include: {
      authors: true,
      genres: true,
    },
  });

  return book;
};

export const createBook = async (createBookDto: CreateBookDto) => {
  const { authors, genres } = createBookDto;

  const newBook = await prismaClient.book.create({
    data: {
      ...createBookDto,
      authors: {
        connect: authors.map((author) => ({ id: author.id })),
      },
      genres: {
        connect: genres.map((genre) => ({ id: genre.id })),
      },
    },
  });

  return newBook;
};

export const updateBookById = async (
  bookId: number,
  updateBookDto: UpdateBookDto
) => {
  const { authors, genres } = updateBookDto;

  const updatedBook = await prismaClient.book.update({
    where: { id: bookId },
    data: {
      ...updateBookDto,
      authors: {
        set: authors.map((author) => ({ id: author.id })),
      },
      genres: {
        set: genres.map((genre) => ({ id: genre.id })),
      },
    },
  });

  return updatedBook;
};

export const deleteBookById = async (bookId: number) => {
  const deletedBook = await prismaClient.book.delete({
    where: { id: bookId },
  });

  return deletedBook;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
