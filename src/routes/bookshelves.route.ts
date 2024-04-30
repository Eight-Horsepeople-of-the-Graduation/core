import { Router } from "express";
import {
  createBookshelf,
  getAllBookshelves,
  addBookToBookshelf,
  getBookshelvesByTitle,
  getBookshelfById,
  deleteBookshelf,
  updateBookshelf,
} from "../controllers/bookshelves.controller";

import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/:id", asyncWrapper(getBookshelfById));
router.get("/title/:title", asyncWrapper(getBookshelvesByTitle));
router.get("/", asyncWrapper(getAllBookshelves));
router.post("/", asyncWrapper(createBookshelf));
router.put("/add-book/:id", asyncWrapper(addBookToBookshelf));
router.put("/:id", asyncWrapper(updateBookshelf));
router.delete("/:id", asyncWrapper(deleteBookshelf));

export default router;
