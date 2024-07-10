import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import { IAuthor } from "@common/interfaces/authors.interface";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "@common/interfaces/books.interface";
import { IGenre } from "@common/interfaces/genres.interface";
import { IReviewWithUserAndBook } from "@common/interfaces/reviews.interface";
import { Transaction } from "@common/types/prismaClient-transaction.type";
import prismaClient from "@common/utils/prisma";
import authorsRepository from "@modules/authors/authors.repository";
import booksRepository from "@modules/books/books.repository";
import { CreateBookDto, UpdateBookDto } from "@modules/books/dtos/books.dto";
import genresRepository from "@modules/genres/genres.repository";
import reviewsRepository from "@modules/reviews/reviews.repository";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllBooks = async (
  searchQueryDto: SearchQueryDto
): Promise<IBook[]> => {
  const books = await booksRepository.getAllBooks(searchQueryDto);

  return books;
};

export const getBookById = async (bookId: number): Promise<IBook> => {
  const book = await booksRepository.getBookById(bookId);
  if (!book) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  return book;
};

export const getReviewsByBookId = async (
  bookId: number
): Promise<IReviewWithUserAndBook[]> => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const reviews = await reviewsRepository.getReviewsByBookId(bookId);

  return reviews;
};

export const getGenresByBookId = async (bookId: number): Promise<IGenre[]> => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const genres = await genresRepository.getGenresByBookId(bookId);

  return genres;
};

export const getAuthorsByBookId = async (
  bookId: number
): Promise<IAuthor[]> => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const authors = await authorsRepository.getAuthorsByBookId(bookId);

  return authors;
};

export const createBook = async (
  createBookDto: CreateBookDto
): Promise<IBookWithoutAuthorsAndGenres> => {
  const newBook = await booksRepository.createBook(createBookDto);

  return newBook;
};

export const updateBookById = async (
  bookId: number,
  updateBookDto: UpdateBookDto
): Promise<IBookWithoutAuthorsAndGenres> => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const updatedBook = await booksRepository.updateBookById(
    bookId,
    updateBookDto
  );

  return updatedBook;
};

export const updateBookRating = async (
  rating: number,
  bookId: number,
  isNewRating: boolean,
  tx?: Transaction
) => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const prisma = tx || prismaClient;
  const currentRatings = await reviewsRepository.aggregateRatingsByBookId(
    bookId,
    prisma
  );
  const newRatingsSum = isNewRating
    ? currentRatings.sum + rating
    : currentRatings.sum - rating;
  const newRatingsCount = isNewRating
    ? currentRatings.count + 1
    : currentRatings.count - 1;

  const newRating = newRatingsSum / newRatingsCount;

  await booksRepository.updateBookRating(newRating, bookId, prisma);

  return newRating;
};
export const deleteBookById = async (
  bookId: number
): Promise<IBookWithoutAuthorsAndGenres> => {
  if (!getBookById(bookId)) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const deletedBook = await booksRepository.deleteBookById(bookId);

  return deletedBook;
};

export default {
  getAllBooks,
  getBookById,
  getReviewsByBookId,
  getGenresByBookId,
  getAuthorsByBookId,
  createBook,
  updateBookById,
  updateBookRating,
  deleteBookById,
};
