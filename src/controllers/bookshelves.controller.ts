import { Request, Response } from "express";
import * as bookshelfService from "../services/bookshelves.service";
import { GetByIdDto, GetByTitleDto, UpdateDto } from "../dtos/bookshelves.dto";

export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;
  const bookshelf = await bookshelfService.createBookshelf(bookshelfData);
  return res.status(201).send(bookshelf);
};

export const getAllBookshelves = async (req: Request, res: Response) => {
  const bookshelves = await bookshelfService.getAllBookshelves();
  return res.send(bookshelves);
};

export const getBookshelfById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Invalid ID parameter");
  }
  const data: GetByIdDto = { id: +id };
  const bookshelf = await bookshelfService.getBookshelfById(data);
  if (!bookshelf) {
    return res.status(400).send("Bookshelf Not Found");
  }
  console.log(req);
  return res.send(bookshelf);
};

export const getBookshelvesByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  const data: GetByTitleDto = { title };
  if (!title) {
    return res.status(400).send("Invalid title parameter");
  }
  const bookshelf = await bookshelfService.getBookshelvesByTitle(data);
  if (!bookshelf) {
    return res.status(404).send("Bookshelf not found");
  }
  return res.send(bookshelf);
};

export const updateBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, privacy } = req.body;
  const data: UpdateDto = { id: +id, title, description, privacy };
  const updatedBookshelf = await bookshelfService.updateBookshelf(data);
  return res.send(updatedBookshelf);
};

export const addBookToBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookId } = req.body;
  const bookshelfId: GetByIdDto = { id: +id };
  const updatedBookshelf = await bookshelfService.addBookToBookshelf(
    bookId,
    bookshelfId
  );
  return res.send(updatedBookshelf);
};

export const deleteBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookshelfId: GetByIdDto = { id: +id };
  const deletedBookshelf = await bookshelfService.deleteBookshelf(bookshelfId);
  return res.send(deletedBookshelf);
};
