import { Router } from "express";
import bookshelvesController from "@controllers/bookshelves.controller";
import { CreateBookshelfDto, UpdateBookshelfDto } from "@dtos";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(bookshelvesController.getAllBookshelves));

router.get(
  "/:bookshelfId",
  asyncWrapper(bookshelvesController.getBookshelfById)
);

router.post(
  "/",
  [validationMiddleware(CreateBookshelfDto)],
  asyncWrapper(bookshelvesController.createBookshelf)
);

router.patch(
  "/add-books/:bookshelfId",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.addBookToBookshelf)
);

router.patch(
  "/remove-books/:bookshelfId",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.removeBooksFromBookshelf)
);

router.put(
  "/:bookshelfId",
  [validationMiddleware(UpdateBookshelfDto)],
  asyncWrapper(bookshelvesController.updateBookshelf)
);

router.delete(
  "/:bookshelfId",
  asyncWrapper(bookshelvesController.deleteBookshelf)
);

export default router;
