import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import { PrismaClient } from "@prisma/client";
import booksRepository from "@repositories/books.repository";
import genresRepository from "@repositories/genres.repository";
import reviewsRepository from "@repositories/reviews.repository";
import prismaClient from "@utils/prisma";
import { Transaction } from "../types/prismaClient-transaction.type";
import authorsRepository from "@repositories/authors.repository";

export const getAllBooks = async (searchQueryDto: SearchQueryDto) => {
  const books = await booksRepository.getAllBooks(searchQueryDto);

  return books;
};

export const getBookById = async (genreId: number) => {
  const book = await booksRepository.getBookById(genreId);

  return book;
};
export const getReviewsByBookId = async (bookId: number) => {
  const reviews = await reviewsRepository.getReviewsByBookId(bookId);

  return reviews;
};

export const getGenresByBookId = async (bookId: number) => {
  const genres = await genresRepository.getGenresByBookId(bookId);

  return genres;
};

export const getAuthorsByBookId = async (bookId: number) => {
  const authors = await authorsRepository.getAuthorsByBookId(bookId);

  return authors;
};

export const createBook = async (createBookDto: CreateBookDto) => {
  const newBook = await booksRepository.createBook(createBookDto);

  return newBook;
};

export const updateBookById = async (
  bookId: number,
  updateBookDto: UpdateBookDto
) => {
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
export const deleteBookById = async (bookId: number) => {
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
