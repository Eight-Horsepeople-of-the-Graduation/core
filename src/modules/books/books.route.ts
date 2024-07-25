import { Router } from "express";
import booksController from "@modules/books/books.controller";
import asyncWrapper from "@common/utils/async-wrapper";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import { authMiddleware } from "@common/middleware/auth.middleware";
import { CreateBookDto } from "@modules/books/dtos/create-book.dto";
import { UpdateBookDto } from "@modules/books/dtos/update-book.dto";

const router = Router();

router.get("/", asyncWrapper(booksController.getAllBooks));

router.get("/:bookId", asyncWrapper(booksController.getBookById));

router.get(
  "/:bookId/reviews",
  asyncWrapper(booksController.getReviewsByBookId)
);

router.get("/:bookId/genres", asyncWrapper(booksController.getGenresByBookId));

router.get(
  "/:bookId/authors",
  asyncWrapper(booksController.getAuthorsByBookId)
);

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateBookDto)],
  asyncWrapper(booksController.createBook)
);

router.patch(
  "/:bookId",
  authMiddleware,
  [validationMiddleware(UpdateBookDto)],
  asyncWrapper(booksController.updateBookById)
);

router.delete(
  "/:bookId",
  authMiddleware,
  asyncWrapper(booksController.deleteBookById)
);

export default router;
