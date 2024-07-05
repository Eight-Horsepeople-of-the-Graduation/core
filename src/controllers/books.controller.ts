import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { uniqBy } from "lodash";
import { GetBookByIdDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import booksService from "@services/books.service";
import bookshelvesService from "@services/bookshelves.service";
import {
  IBook,
  OptionalBook,
} from "../interfaces/books.interface";

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<Response<IBook[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const books: IBook[] = await booksService.getAllBooks(filter);

  return res.send(books);
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalBook>> => {
  const { bookId } = req.params;

  const data: GetBookByIdDto = { id: +bookId };

  const book: OptionalBook = await booksService.getBookById(data.id);
  if (!book) return res.status(404).send("Book Not Found");

  return res.send(book);
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<Response<IBook>> => {
  const bookData = req.body;

  const book: IBook =
    await booksService.createBook(bookData);

  return res.status(201).send(book);
};

export const updateBookById = async (
  req: Request,
  res: Response
): Promise<Response<IBook>> => {
  const { bookId } = req.params;
  const data: UpdateBookDto = req.body;

  const book: IBook = await booksService.updateBookById(
    +bookId,
    data
  );

  return res.send(book);
};

export const deleteBookById = async (
  req: Request,
  res: Response
): Promise<Response<IBook>> => {
  const { bookId } = req.params;
  const data: GetBookByIdDto = { id: +bookId };

  const book: IBook = await booksService.deleteBookById(
    data.id
  );

  return res.send(book);
};

export const getBooksByUserId = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookshelves = await bookshelvesService.getBookshelvesByUserId(+bookId);
  const books = bookshelves.flatMap(
    (bookshelf: any) => bookshelf.books
  );
  const distinctBooks = uniqBy(books, "id");
  return res.send(distinctBooks);
};

export default {
  getAllBooks,
  getBookById,
  getBooksByUserId,
  createBook,
  updateBookById,
  deleteBookById,
};
