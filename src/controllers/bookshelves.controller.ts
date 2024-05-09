import { Request, Response } from "express";
import bookshelfService from "../services/bookshelves.service";
import {
  GetBookshelvesByIdDto,
  GetBookshelvesByTitleDto,
  UpdateBookshelvesDto,
} from "../dtos/bookshelves.dto";

export const getAllBookshelves = async (req: Request, res: Response) => {
  // const { sort } = req.query as { sort: string };

  const bookshelves = await bookshelfService.getAllBookshelves();

  return res.send(bookshelves);
};

export const getBookshelfById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Invalid ID parameter");

  const data: GetBookshelvesByIdDto = { id: +id };
  const bookshelf = await bookshelfService.getBookshelfById(data);
  if (!bookshelf) return res.status(400).send("Bookshelf Not Found");

  console.log(req);
  return res.send(bookshelf);
};

export const getBookshelvesByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  const data: GetBookshelvesByTitleDto = { title };
  if (!title) return res.status(400).send("Invalid title parameter");

  const bookshelf = await bookshelfService.getBookshelvesByTitle(data);
  if (!bookshelf) return res.status(404).send("Bookshelf not found");

  return res.send(bookshelf);
};

export const getBookshelvesByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(404).send("User Not Found");
  const bookshelf = await bookshelfService.getBookshelvesByUserId(+id);
  return res.send(bookshelf);
};

export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;
  const bookshelf = await bookshelfService.createBookshelf(bookshelfData);
  return res.status(201).send(bookshelf);
};

export const updateBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(req.body);
  const bookshelfId: GetBookshelvesByIdDto = { id: +id };
  const updatedBookshelf = await bookshelfService.updateBookshelf(
    bookshelfId,
    updatedData
  );
  return res.send(updatedBookshelf);
};

export const addBookToBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookIds } = req.body;
  const bookshelfId: GetBookshelvesByIdDto = { id: +id };
  const updatedBookshelf = await bookshelfService.addBookToBookshelf(
    bookshelfId,
    bookIds
  );
  return res.send(updatedBookshelf);
};

export const removeBooksFromBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookIds } = req.body;
  const bookshelfId: GetBookshelvesByIdDto = { id: +id };
  const updatedBookshelf = await bookshelfService.removeBooksFromBookshelf(
    bookshelfId,
    bookIds
  );
  return res.send(updatedBookshelf);
};

export const deleteBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookshelfId: GetBookshelvesByIdDto = { id: +id };
  const deletedBookshelf = await bookshelfService.deleteBookshelf(bookshelfId);
  return res.send(deletedBookshelf);
};

export default {
  createBookshelf,
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByTitle,
  getBookshelvesByUserId,
  updateBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  deleteBookshelf,
};
