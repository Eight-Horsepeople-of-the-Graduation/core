import { Router } from "express";
import booksController from "@controllers/books.controller";
import { CreateBookDto, UpdateBookDto } from "@dtos";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";

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
  [validationMiddleware(CreateBookDto)],
  asyncWrapper(booksController.createBook)
);

router.patch(
  "/:bookId",
  [validationMiddleware(UpdateBookDto)],
  asyncWrapper(booksController.updateBookById)
);

router.delete("/:bookId", asyncWrapper(booksController.deleteBookById));

export default router;
