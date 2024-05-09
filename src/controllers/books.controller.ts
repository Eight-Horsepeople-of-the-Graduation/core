import * as bookService from "../services/books.service";
import * as bookshelfService from "../services/bookshelves.service";
import { GetBookByIdDto, UpdateBookDto } from "../dtos/books.dto";
import { Request, Response } from "express";
import { uniqBy } from "lodash";

export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await bookService.createBook(bookData);

  return res.status(201).send(book);
};

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();

  return res.send(books);
};

export const getAllBooksByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  if (!title) return res.status(400).send("Invalid Title parameter");

  const books = await bookService.getAllBooksByTitle(title);

  return res.send(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Invalid ID parameter");

  const data: GetBookByIdDto = { id: +id };

  const book = await bookService.getBookById(data.id);
  if (!book) return res.status(400).send("Book Not Found");

  return res.send(book);
};

export const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateBookDto = req.body;

  const book = await bookService.updateBookById(+id, data);

  return res.send(book);
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: GetBookByIdDto = { id: +id };

  const book = await bookService.deleteBookById(data.id);

  return res.send(book);
};

export const getBooksByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookshelves = await bookshelfService.getBookshelvesByUserId(+id);
  const books = bookshelves.flatMap(
    (bookshelf: { books: any }) => bookshelf.books
  );
  const distinctBooks = uniqBy(books, "id");
  return res.send(distinctBooks);
};

export default {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBookById,
  deleteBookById,
  getBooksByUserId,
};
