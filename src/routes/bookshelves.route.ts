import { Router } from "express";
import {
  createBookshelf,
  getAllBookshelves,
  addBookToBookshelf,
  getBookshelvesByTitle,
  getBookshelfById,
  deleteBookshelf,
  updateBookshelf,
  removeBooksFromBookshelf,
} from "../controllers/bookshelves.controller";

import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/:id", asyncWrapper(getBookshelfById));
router.get("/title/:title", asyncWrapper(getBookshelvesByTitle));
router.get("/", asyncWrapper(getAllBookshelves));
router.post("/", asyncWrapper(createBookshelf));
router.patch("/add-books/:id", asyncWrapper(addBookToBookshelf));
router.patch("/remove-books/:id", asyncWrapper(removeBooksFromBookshelf));
router.put("/:id", asyncWrapper(updateBookshelf));
router.delete("/:id", asyncWrapper(deleteBookshelf));

export default router;
