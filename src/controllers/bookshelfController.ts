import { Request, Response } from "express";
import * as bookshelfService from "../services/bookshelfService";
export const listBooksehlves = async (req: Request, res: Response) => {
  try {
    const bookshelves = await bookshelfService.getBookshelves();

    return res.status(200).send(bookshelves);
  } catch (error) {
    console.error("Error Listing Books:", error);
    return res.status(500).send("INternal Server Error");
  }
};

export const listBookshelf = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== "string") {
    return res.status(400).send("Invalid title parameter");
  }
  try {
    const bookshelf = await bookshelfService.getBookshelf(title);
    if (!bookshelf) {
      return res.status(404).send("Bookshelf not found");
    }
    return res.status(200).send(bookshelf);
  } catch (error) {
    console.error("Error viewing bookshelf:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const addBookshelf = async (req: Request, res: Response) => {
  try {
    const bookshelfData = req.body;
    const bookshelf = await bookshelfService.addBookshelf(bookshelfData);

    return res.status(201).send(bookshelf);
  } catch (error) {
    console.error("Error adding bookshelf:", error);
    return res.status(500).send("Internal Server Error");
  }
};
