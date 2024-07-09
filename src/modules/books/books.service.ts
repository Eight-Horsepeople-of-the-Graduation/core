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

export const getBookById = async (bookId: number): Promise<OptionalBook> => {
  const book = await booksRepository.getBookById(bookId);

  return book;
};

export const getReviewsByBookId = async (
  bookId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews = await reviewsRepository.getReviewsByBookId(bookId);

  return reviews;
};

export const getGenresByBookId = async (bookId: number): Promise<IGenre[]> => {
  const genres = await genresRepository.getGenresByBookId(bookId);

  return genres;
};

export const getAuthorsByBookId = async (
  bookId: number
): Promise<IAuthor[]> => {
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
