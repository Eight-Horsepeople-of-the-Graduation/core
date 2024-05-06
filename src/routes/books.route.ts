import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBookById,
  deleteBookById,
  getBooksByUserId,
} from "../controllers/books.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.post("/", asyncWrapper(createBook));
router.get("/", asyncWrapper(getAllBooks));
router.get("/:title", asyncWrapper(getAllBooksByTitle));
router.delete("/:id", asyncWrapper(deleteBookById));
router.put("/:id", asyncWrapper(updateBookById));
router.get("/:id", asyncWrapper(getBookById));
router.get("/book-of-user/:id", asyncWrapper(getBooksByUserId));

export default router;
