import { Request, Response } from "express";
import * as bookService from "../services/books.service";

// show all books
export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();

  return res.send(books);
};

// show book by title
export const getBook = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  if (!title) return res.status(400).send("Invalid title parameter");

  const book = await bookService.getBook(title);
  if (!book) return res.status(404).send("Book not found");

  return res.status(200).send(book);
};

// add book
export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await bookService.createBook(bookData);

  return res.status(201).send(book);
};

export default {
  getAllBooks,
  getBook,
  createBook,
};
