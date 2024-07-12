import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import bookshelvesController from "@modules/bookshelves/bookshelves.controller";
import {
  CreateBookshelfDto,
  UpdateBookshelfDto,
} from "@modules/bookshelves/dtos/bookshelves.dto";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(bookshelvesController.getAllBookshelves));

router.get(
  "/:bookshelfId",
  asyncWrapper(bookshelvesController.getBookshelfById)
);

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateBookshelfDto)],
  asyncWrapper(bookshelvesController.createBookshelf)
);

router.patch(
  "/add-books/:bookshelfId",
  authMiddleware,
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.addBookToBookshelf)
);

router.patch(
  "/remove-books/:bookshelfId",
  authMiddleware,
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.removeBooksFromBookshelf)
);

router.patch(
  "/:bookshelfId",
  authMiddleware,
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.updateBookshelf)
);

router.delete(
  "/:bookshelfId",
  authMiddleware,
  asyncWrapper(bookshelvesController.deleteBookshelf)
);

export default router;
