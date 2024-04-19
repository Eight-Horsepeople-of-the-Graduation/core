import { Request, Response } from "express";
import * as bookshelfService from "../services/bookshelves.service";
//get all
export const getAllBookshelves = async (req: Request, res: Response) => {
  const bookshelves = await bookshelfService.getAllBookshelves();

  return res.send(bookshelves);
};

//add
export const createBookshelf = async (req: Request, res: Response) => {
  const bookshelfData = req.body;

  const bookshelf = await bookshelfService.createBookshelf(bookshelfData);

  return res.status(201).send(bookshelf);
};
//get by id
export const getBookshelfById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== "number") {
    return res.status(400).send("Invalid ID parameter");
  }
  const bookshelf = await bookshelfService.getBookshelfById(+id);
  if (!bookshelf) {
    return res.status(400).send("Bookshelf Not Found");
  }
  console.log(req);
  return res.send(bookshelf);
};
//get by title - conventioned
export const getBookshelvesByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  if (!title || typeof title !== "string") {
    return res.status(400).send("Invalid title parameter");
  }

  const bookshelf = await bookshelfService.getBookshelvesByTitle(title);
  if (!bookshelf) {
    return res.status(404).send("Bookshelf not found");
  }
  return res.send(bookshelf);
};

//update bookshelf details
export const updateBookshelf = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedBookshelf = await bookshelfService.updateBookshelf(
    +id,
    updatedData
  );
  //console.log(updatedBookshelf);
  return res.send(updatedBookshelf);
};

//update bookshelf by adding book
export const addBookToBookshelf = async (req: Request, res: Response) => {
  const Ids = req.body;
  const updatedBookshelf = await bookshelfService.addBookToBookshelf(Ids);
  return res.send(updatedBookshelf);
};

//delete bookshelf
export const deleteBookshelf = async (req: Request, res: Response) => {
  const bookshelfId = req.body;
  const deletedBookshelf = await bookshelfService.deleteBookshelf(bookshelfId);
  return res.send(deletedBookshelf);
};
