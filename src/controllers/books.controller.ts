import { Request, Response } from "express";
import * as bookService from "../services/books.service";

// add book
export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await bookService.createBook(bookData);

  return res.status(201).send(book);
};

// show all books
export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();

  return res.send(books);
};
//TO-DO:
/*
// show book by title
export const getBookByTitle = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  if (!title) return res.status(400).send("Invalid title parameter");
  const book = await bookService.getBookByTitle(title); // TO-DO: create service and route
  if (!book) return res.status(404).send("Book not found");
  return res.status(200).send(book);
};

// add book
export const createBook = async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await bookService.createBook(bookData);

  return res.status(201).send(book);
};

// update book
export const updateBook = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {updatedData} = req.body

  const updatedBook = await bookService.updateBook(+id, updatedData);

  return res.status(200).send(updatedBook);
};

// delete book
export const deleteBook = async (req: Request, res: Response) => {
  const id = req.query.title;

  const deleted = await bookService.deleteBook(id);
  if (!deleted) return res.status(404).send("Failed to delete the book");

  return res.status(204).send();
};

export default {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
