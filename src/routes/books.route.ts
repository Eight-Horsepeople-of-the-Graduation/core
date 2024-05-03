import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../controllers/books.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.post("/", asyncWrapper(createBook));
router.get("/", asyncWrapper(getAllBooks));
router.get("/book/:title", asyncWrapper(getAllBooksByTitle));
router.delete("/:id", asyncWrapper(deleteBookById));
router.get("/:id", asyncWrapper(updateBookById));
router.put("/:id,", asyncWrapper(getBookById));

export default router;
