import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { SearchQueryDto } from "@dtos";
import bookshelvesService from "@services/bookshelves.service";

export const getAllBookshelves = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const bookshelves = await bookshelvesService.getAllBookshelves(filter);

  return res.send(bookshelves);
};

export const getBookshelfById = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const bookshelf = await bookshelvesService.getBookshelfById(bookshelfId);

  return res.send(bookshelf);
};

export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;

  const bookshelf = await bookshelvesService.createBookshelf(bookshelfData);

  return res.status(201).send(bookshelf);
};

export const addBookToBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const { bookIds } = req.body;

  const updatedBookshelf = await bookshelvesService.addBookToBookshelf(
    bookshelfId,
    bookIds
  );

  return res.send(updatedBookshelf);
};

export const removeBooksFromBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const bookIds = req.body.bookIds;

  const updatedBookshelf = await bookshelvesService.removeBooksFromBookshelf(
    bookshelfId,
    bookIds
  );
  return res.send(updatedBookshelf);
};

export const updateBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  const updatedData = req.body;

  const updatedBookshelf = await bookshelvesService.updateBookshelf(
    bookshelfId,
    updatedData
  );

  return res.send(updatedBookshelf);
};

export const deleteBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const deletedBookshelf =
    await bookshelvesService.deleteBookshelf(bookshelfId);

  return res.send(deletedBookshelf);
};

export default {
  getAllBookshelves,
  getBookshelfById,
  createBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
