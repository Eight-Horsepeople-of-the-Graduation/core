import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/books.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.post("/", asyncWrapper(createBook));
router.get("/", asyncWrapper(getAllBooks));
router.get("/search", asyncWrapper(getAllBooksByTitle));
router.delete("/:id", asyncWrapper(deleteBook));
router.get("/:id", asyncWrapper(updateBook));
router.put("/:id,", asyncWrapper(getBookById));

export default router;
