import { Router } from "express";
import bookshelvesController from "../controllers/bookshelves.controller";
import { CreateBookshelfDto, UpdateBookshelfDto } from "../dtos";
import { validationMiddleware } from "../middleware/validation.middleware";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(bookshelvesController.getAllBookshelves));

router.get("/:id", asyncWrapper(bookshelvesController.getBookshelfById));

router.get(
  "/user/:id",
  asyncWrapper(bookshelvesController.getBookshelvesByUserId)
);

router.post(
  "/",
  [validationMiddleware(CreateBookshelfDto)],
  asyncWrapper(bookshelvesController.createBookshelf)
);

router.patch(
  "/add-books/:id",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.addBookToBookshelf)
);

router.patch(
  "/remove-books/:id",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.removeBooksFromBookshelf)
);

router.put(
  "/:id",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.updateBookshelf)
);

router.delete("/:id", asyncWrapper(bookshelvesController.deleteBookshelf));

export default router;
