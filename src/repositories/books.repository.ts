import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
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
  if (bookId < 0) {
    throw new Error("Invalid book ID");
  }

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
        connect: authors.map((id) => ({ id })),
      },
      genres: {
        connect: genres.map((id) => ({ id })),
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

export const getBooksByUserId = async (userId: number) => {
  const bookshelves = await prismaClient.bookshelf.findMany({
    where: { userId },
    include: {
      books: {
        include: {
          authors: true,
          genres: true,
        },
      },
    },
  });

  const books = bookshelves.flatMap((bookshelf) => bookshelf.books);
  const distinctBooks = [...new Set(books.map((book) => book.id))].map((id) =>
    books.find((book) => book.id === id)
  );

  return distinctBooks;
};

export default {
  getAllBooks,
  getBookById,
  getBooksByUserId,
  createBook,
  updateBookById,
  deleteBookById,
};
