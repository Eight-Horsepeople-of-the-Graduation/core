import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import booksService from "@modules/books/books.service";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "@common/interfaces/books.interface";
import { IReviewWithUserAndBook } from "@common/interfaces/reviews.interface";
import { IGenre } from "@common/interfaces/genres.interface";
import { IAuthor } from "@common/interfaces/authors.interface";
import { UpdateBookDto } from "@modules/books/dtos/books.dto";
import { HttpException } from "@common/exceptions/http.exception";
import { HttpStatus } from "@common/enums/http-status.enum";

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
    return res.status(400).send("ID parameter is missing");
  }

  const book: OptionalBook = await booksService.getBookById(bookId);

  return res.send(book);
};

export const getReviewsByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook[]>> => {
  const bookId = parseInt(req.params.bookId, 10);

  const reviews = await booksService.getReviewsByBookId(bookId);

  return res.send(reviews);
};

export const getGenresByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IGenre[]>> => {
  const bookId = parseInt(req.params.bookId, 10);

  const genres = await booksService.getGenresByBookId(bookId);

  return res.send(genres);
};

export const getAuthorsByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor>> => {
  const bookId = parseInt(req.params.bookId, 10);

  const authors = await booksService.getAuthorsByBookId(bookId);

  return res.send(authors);
};
export const createBook = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres>> => {
  const bookData = req.body;

  if (!bookData) {
    throw new HttpException(
      "Bad Request: Empty request body",
      HttpStatus.BAD_REQUEST
    );
  }

  const book: IBookWithoutAuthorsAndGenres =
    await booksService.createBook(bookData);

  return res.status(201).send(book);
};

export const updateBookById = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres>> => {
  const bookId = parseInt(req.params.bookId, 10);

  const data: UpdateBookDto = req.body;

  if (isNaN(bookId)) {
    throw new HttpException("ID parameter is missing.", HttpStatus.BAD_REQUEST);
  }

  const book = await booksService.updateBookById(bookId, data);

  return res.send(book);
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  if (!bookId) {
    throw new HttpException("ID parameter is missing.", HttpStatus.BAD_REQUEST);
  }
  const book = await booksService.deleteBookById(+bookId);

  return res.send(book);
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
