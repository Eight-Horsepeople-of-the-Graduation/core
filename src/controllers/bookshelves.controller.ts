import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { GetBookshelfByIdDto, SearchQueryDto } from "../dtos";
import bookshelvesService from "../services/bookshelves.service";

export const getAllBookshelves = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const bookshelves = await bookshelvesService.getAllBookshelves(filter);

  return res.send(bookshelves);
};

export const getBookshelfById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Invalid ID parameter");

  const data: GetBookshelfByIdDto = { id: +id };
  const bookshelf = await bookshelvesService.getBookshelfById(data);
  if (!bookshelf) return res.status(400).send("Bookshelf Not Found");

  console.log(req);
  return res.send(bookshelf);
};

export const getBookshelvesByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(404).send("User Not Found");

  const bookshelf = await bookshelvesService.getBookshelvesByUserId(+id);

  return res.send(bookshelf);
};

export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;

  const bookshelf = await bookshelvesService.createBookshelf(bookshelfData);

  return res.status(201).send(bookshelf);
};

export const addBookToBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookIds } = req.body;
  const bookshelfId: GetBookshelfByIdDto = { id: +id };

  const updatedBookshelf = await bookshelvesService.addBookToBookshelf(
    bookshelfId,
    bookIds
  );

  return res.send(updatedBookshelf);
};

export const removeBooksFromBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookIds } = req.body;
  const bookshelfId: GetBookshelfByIdDto = { id: +id };
  const updatedBookshelf = await bookshelvesService.removeBooksFromBookshelf(
    bookshelfId,
    bookIds
  );
  return res.send(updatedBookshelf);
};

export const updateBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const bookshelfId: GetBookshelfByIdDto = { id: +id };

  const updatedBookshelf = await bookshelvesService.updateBookshelf(
    bookshelfId,
    updatedData
  );

  return res.send(updatedBookshelf);
};

export const deleteBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookshelfId: GetBookshelfByIdDto = { id: +id };
  const deletedBookshelf =
    await bookshelvesService.deleteBookshelf(bookshelfId);
  return res.send(deletedBookshelf);
};

export default {
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByUserId,
  createBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
