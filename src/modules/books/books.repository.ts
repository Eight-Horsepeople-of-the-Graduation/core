import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "@common/interfaces/books.interface";
import { Transaction } from "@common/types/prismaClient-transaction.type";
import prismaClient from "@common/utils/prisma";
import { CreateBookDto, UpdateBookDto } from "@modules/books/dtos/books.dto";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllBooks = async (
  searchQueryDto: SearchQueryDto,
): Promise<IBook[]> => {
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

export const getBookById = async (bookId: number): Promise<OptionalBook> => {
  const book = await prismaClient.book.findUnique({
    where: { id: bookId },
    include: {
      authors: true,
      genres: true,
    },
  });

  return book;
};

export const getBooksByAuthorId = async (
  authorId: number,
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books: IBookWithoutAuthorsAndGenres[] =
    await prismaClient.book.findMany({
      where: {
        authors: {
          some: {
            id: authorId,
          },
        },
      },
    });

  return books;
};

export const getBooksByGenreId = async (
  genreId: number,
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books: IBookWithoutAuthorsAndGenres[] =
    await prismaClient.book.findMany({
      where: {
        genres: {
          some: {
            id: genreId,
          },
        },
      },
    });

  return books;
};

export const getBooksByReadingChallengeId = async (
  readingChallengeId: number,
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books: IBookWithoutAuthorsAndGenres[] =
    await prismaClient.book.findMany({
      where: {
        readingChallenges: {
          some: {
            id: readingChallengeId,
          },
        },
      },
    });

  return books;
};

export const createBook = async (
  createBookDto: CreateBookDto,
): Promise<IBookWithoutAuthorsAndGenres> => {
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
  updateBookDto: UpdateBookDto,
): Promise<IBookWithoutAuthorsAndGenres> => {
  const { authors, genres } = updateBookDto;

  const updatedBook = await prismaClient.book.update({
    where: { id: bookId },
    data: {
      ...updateBookDto,
      authors: {
        set: authors?.map((author) => ({ id: author.id })),
      },
      genres: {
        set: genres?.map((genre) => ({ id: genre.id })),
      },
    },
  });

  return updatedBook;
};

export const updateBookRating = async (
  rating: number,
  bookId: number,
  tx?: Transaction,
) => {
  const prisma = tx || prismaClient;
  const updatedBook = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      rating,
    },
  });
  return updatedBook;
};

export const deleteBookById = async (
  bookId: number,
): Promise<IBookWithoutAuthorsAndGenres> => {
  const deletedBook = await prismaClient.book.delete({
    where: {
      id: bookId,
    },
  });

  return deletedBook;
};

export const getBooksByUserId = async (userId: number): Promise<IBook[]> => {
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

  const books: IBook[] = bookshelves.flatMap((bookshelf) => bookshelf.books);
  const distinctBooks = [...new Set(books.map((book) => book.id))].map((id) =>
    books.find((book) => book.id === id),
  );

  return distinctBooks;
};

export default {
  getAllBooks,
  getBookById,
  getBooksByAuthorId,
  getBooksByGenreId,
  getBooksByReadingChallengeId,
  createBook,
  updateBookById,
  updateBookRating,
  deleteBookById,
  getBooksByUserId,
};
