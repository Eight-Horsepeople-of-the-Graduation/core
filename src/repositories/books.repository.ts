import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import prismaClient from "@utils/prisma";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";
import { aggregateRatingsByBookId } from "./reviews.repository";
import { IBook, OptionalBook } from "../interfaces/books.interface";
import { prismaWrapper } from "@utils/prisma-wrapper";

export const getAllBooks = async (
  searchQueryDto: SearchQueryDto
): Promise<IBook[]> => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip: number = (page - 1) * limit;

  const books: IBook[] = await prismaWrapper(prismaClient.book.findMany, {
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
  const book: OptionalBook = await prismaWrapper(prismaClient.book.findUnique, {
    where: { id: bookId },
    include: {
      authors: true,
      genres: true,
    },
  });

  return book;
};

export const createBook = async (
  createBookDto: CreateBookDto
): Promise<IBook> => {
  const { authors, genres } = createBookDto;

  const newBook = await prismaWrapper(prismaClient.book.create, {
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
): Promise<IBook> => {
  const { authors, genres } = updateBookDto;

  const updatedBook: IBook = await prismaWrapper(prismaClient.book.update, {
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

export const updateBookRating = async (
  updatedReviewDto: UpdateReviewDto
): Promise<void> => {
  const { count: currentRatingsCount, sum: currentRatingsSum } =
    await aggregateRatingsByBookId(updatedReviewDto.bookId);

  if (updatedReviewDto.rating === undefined) return;
  const newRatingsSum =
    currentRatingsSum?.rating || 0 + updatedReviewDto.rating;
  const newRatingsCount = currentRatingsCount?.rating || 0 + 1;

  await prismaWrapper(prismaClient.book.update, {
    where: { id: updatedReviewDto.bookId },
    data: {
      rating: newRatingsSum / newRatingsCount,
    },
  });
};

export const removeBookRating = async (
  updatedReviewDto: UpdateReviewDto
): Promise<void> => {
  const { count: currentRatingsCount, sum: currentRatingsSum } =
    await aggregateRatingsByBookId(updatedReviewDto.bookId);

  if (updatedReviewDto.rating === undefined) return;
  const newRatingsSum = currentRatingsSum.rating || 0 - updatedReviewDto.rating;
  const newRatingsCount = currentRatingsCount.rating || 0 - 1;

  await prismaWrapper(prismaClient.book.update, {
    where: { id: updatedReviewDto.bookId },
    data: {
      rating: newRatingsSum / newRatingsCount,
    },
  });
};

export const deleteBookById = async (bookId: number): Promise<IBook> => {
  const deletedBook : IBook = await prismaWrapper(prismaClient.book.delete, {
    where: {
      id: bookId,
    },
  });

  return deletedBook;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  updateBookRating,
  removeBookRating,
};
