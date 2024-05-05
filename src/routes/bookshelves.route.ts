import { Router } from "express";
import bookshelfController from "../controllers/bookshelves.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "@middleware/validation.middleware";
import { CreateBooshelvesDto, UpdateBookshelvesDto } from "../dtos";

const router = Router();

router.get("/:id", asyncWrapper(bookshelfController.getBookshelfById));

router.get(
  "/title/:title",
  asyncWrapper(bookshelfController.getBookshelvesByTitle)
);

router.get("/", asyncWrapper(bookshelfController.getAllBookshelves));

router.get(
  "/user/:id",
  asyncWrapper(bookshelfController.getBookshelvesByUserId)
);

router.post(
  "/",
  [validationMiddleware(CreateBooshelvesDto)],
  asyncWrapper(bookshelfController.createBookshelf)
);

router.patch(
  "/add-books/:id",
  [validationMiddleware(UpdateBookshelvesDto)],
  asyncWrapper(bookshelfController.addBookToBookshelf)
);

router.patch(
  "/remove-books/:id",
  [validationMiddleware(UpdateBookshelvesDto)],
  asyncWrapper(bookshelfController.removeBooksFromBookshelf)
);

router.put(
  "/:id",
  [validationMiddleware(UpdateBookshelvesDto)],
  asyncWrapper(bookshelfController.updateBookshelf)
);

router.delete("/:id", asyncWrapper(bookshelfController.deleteBookshelf));

export default router;
