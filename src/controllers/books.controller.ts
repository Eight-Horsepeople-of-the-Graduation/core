import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { SearchQueryDto, UpdateBookDto } from "@dtos";
import booksService from "@services/books.service";

export const getAllBooks = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const books = await booksService.getAllBooks(filter);

  return res.send(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  const book = await booksService.getBookById(bookId);

  return res.send(book);
};

export const getReviewsByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  const reviews = await booksService.getReviewsByBookId(bookId);

  return res.send(reviews);
};

export const getGenresByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId);

  const genres = await booksService.getGenresByBookId(bookId);

  return res.send(genres);
};

export const getAuthorsByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  const authors = await booksService.getAuthorsByBookId(bookId);

  return res.send(authors);
};

export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await booksService.createBook(bookData);

  return res.status(201).send(book);
};

export const updateBookById = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  const data: UpdateBookDto = req.body;

  const book = await booksService.updateBookById(bookId, data);

  return res.send(book);
};

export const deleteBookById = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  const book = await booksService.deleteBookById(bookId);

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
