import { Request, Response } from "express";
import * as bookshelfService from "../services/bookshelves.service";

export const getAllBookshelves = async (req: Request, res: Response) => {
  const bookshelves = await bookshelfService.getAllBookshelves();

  return res.send(bookshelves);
};

export const getBookshelf = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  if (!title) return res.status(400).send("Invalid title parameter");

  const bookshelf = await bookshelfService.getBookshelf(title);
  if (!bookshelf) return res.status(404).send("Bookshelf not found");

  return res.send(bookshelf);
};

export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;

  const bookshelf = await bookshelfService.createBookshelf(bookshelfData);

  return res.status(201).send(bookshelf);
};

export default {
  getAllBookshelves,
  getBookshelf,
  createBookshelf,
};
