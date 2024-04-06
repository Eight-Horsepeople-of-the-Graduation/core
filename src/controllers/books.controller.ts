import { Request, Response } from "express";
import * as bookService from "../services/books.service";

// show all books
export const listBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getBooks();

    return res.status(200).send(books);
  } catch (error) {
    console.error("Error Listing books:", error);

    return res.status(500).send("Internal Server Error");
  }
};
//show book by title
export const listBook = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== "string") {
    return res.status(400).send("Invalid title parameter");
  }
  try {
    const book = await bookService.getBook(title);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error("Error viewing book:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const listManyBooks = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== "string") {
    return res.status(400).send("Invalid title parameter");
  }
  try {
    const book = await bookService.getManyBooks(title);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error("Error viewing book:", error);
    return res.status(500).send("Internal Server Error");
  }
};
//add book
export const addBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const book = await bookService.addBook(bookData);

    return res.status(201).send(book);
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).send("Internal Server Error");
  }
};
