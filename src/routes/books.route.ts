import { Router } from "express";
import booksController from "@controllers/books.controller";
import { CreateBookDto, UpdateBookDto } from "@dtos";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(booksController.getAllBooks));

router.get("/:id", asyncWrapper(booksController.getBookById));

router.post(
  "/",
  [validationMiddleware(CreateBookDto)],
  asyncWrapper(booksController.createBook)
);

router.put(
  "/:id",
  [validationMiddleware(UpdateBookDto)],
  asyncWrapper(booksController.updateBookById)
);

router.delete("/:id", asyncWrapper(booksController.deleteBookById));

router.get("/book-of-user/:id", asyncWrapper(booksController.getBooksByUserId));

export default router;
