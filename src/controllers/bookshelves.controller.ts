import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { SearchQueryDto } from "../dtos";
import bookshelvesService from "../services/bookshelves.service";
import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
} from "../interfaces/bookshelves.interface";
import { isNaN } from "lodash";

export const getAllBookshelves = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelfWithUser[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const bookshelves: IBookshelfWithUser[] =
    await bookshelvesService.getAllBookshelves(filter);

  return res.send(bookshelves);
};

export const getBookshelfById = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

  const bookshelf = await bookshelvesService.getBookshelfById(bookshelfId);
  if (!bookshelf) return res.status(400).send("Bookshelf Not Found");

  return res.send(bookshelf);
};

export const getBookshelvesByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf[]>> => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

  const bookshelf = await bookshelvesService.getBookshelfById(bookshelfId);

  return res.send(bookshelf);
};

export const createBookshelf = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const bookshelfData = req.body;

  const bookshelf = await bookshelvesService.createBookshelf(bookshelfData);

  return res.status(201).send(bookshelf);
};

export const addBookToBookshelf = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

  const { bookIds } = req.body;

  const updatedBookshelf = await bookshelvesService.addBookToBookshelf(
    bookshelfId,
    bookIds
  );

  return res.send(updatedBookshelf);
};

export const removeBooksFromBookshelf = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

  const bookIds = req.body.bookIds;

  const updatedBookshelf = await bookshelvesService.removeBooksFromBookshelf(
    bookshelfId,
    bookIds
  );
  return res.send(updatedBookshelf);
};

export const updateBookshelf = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

  const updatedData = req.body;

  const updatedBookshelf = await bookshelvesService.updateBookshelf(
    bookshelfId,
    updatedData
  );

  return res.send(updatedBookshelf);
};

export const deleteBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = parseInt(req.params.bookshelfId, 10);
  if (isNaN(bookshelfId)) return res.status(400).send("Invalid ID parameter");

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
