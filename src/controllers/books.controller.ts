import { Request, Response } from "express";
import * as bookService from "../services/books.service";
import { GetBookByIdDto, UpdateBookDto } from "../dtos/books.dto";

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
  const { title } = req.query;
  if (!title) return res.status(400).send("Invalid title query parameter");

  const books = await bookService.getAllBooksByTitle(title as string);
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

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    isbn,
    description,
    language,
    format,
    country,
    numOfPages,
    publishDate,
    authors,
    genres,
  } = req.body;
  const data: UpdateBookDto = {
    title,
    isbn,
    description,
    language,
    format,
    country,
    numOfPages,
    publishDate,
    authors,
    genres,
  };
  const updatedBook = await bookService.updateBook(+id, data);
  return res.send(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: GetBookByIdDto = { id: +id };
  const deletedBook = await bookService.deleteBook(data.id);
  return res.send(deletedBook);
};

export default {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBook,
  deleteBook,
};
