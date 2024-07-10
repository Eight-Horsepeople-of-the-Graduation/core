import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { SearchQueryDto } from "../dtos";
import booksService from "../services/books.service";
import bookshelvesService from "../services/bookshelves.service";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "../interfaces/books.interface";
import { IReviewWithUserAndBook } from "../interfaces/reviews.interface";
import { IGenre } from "../interfaces/genres.interface";
import { IAuthor } from "../interfaces/authors.interface";
import { HttpException } from "@exceptions/http.exception";
import { HttpStatus } from "@enums/http-status.enum";

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<Response<IBook[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const books = await booksService.getAllBooks(filter);

  return res.send(books);
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalBook>> => {
  const bookId = parseInt(req.params.bookId, 10);
  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }
  const book = await booksService.getBookById(bookId);

  return res.send(book);
};

export const getReviewsByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook[]>> => {
  const bookId = parseInt(req.params.bookId, 10);
  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }

  const reviews = await booksService.getReviewsByBookId(bookId);

  return res.send(reviews);
};

export const getGenresByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IGenre[]>> => {
  const bookId = parseInt(req.params.bookId, 10);

  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }
  const genres = await booksService.getGenresByBookId(bookId);

  return res.send(genres);
};

export const getAuthorsByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor>> => {
  const bookId = parseInt(req.params.bookId, 10);

  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }

  const authors = await booksService.getAuthorsByBookId(bookId);

  return res.send(authors);
};
export const createBook = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres>> => {
  const bookData = req.body;

  const book = await booksService.createBook(bookData);

  return res.status(HttpStatus.CREATED).send(book);
};

export const updateBookById = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres>> => {
  const bookId = parseInt(req.params.bookId, 10);
  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }

  const updatedData = req.body;
  const updatedBook = await bookshelvesService.updateBookshelf(
    bookId,
    updatedData
  );
  return res.send(updatedBook);
};

export const deleteBookById = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres>> => {
  const bookId = parseInt(req.params.bookId, 10);
  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }

  const deletedBook = await booksService.deleteBookById(bookId);

  return res.send(deletedBook);
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  getReviewsByBookId,
  getGenresByBookId,
  getAuthorsByBookId,
};
