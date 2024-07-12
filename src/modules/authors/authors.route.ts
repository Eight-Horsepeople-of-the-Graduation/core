import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import authorsController from "@modules/authors/authors.controller";
import {
  CreateAuthorDto,
  UpdateAuthorDto,
} from "@modules/authors/dtos/authors.dto";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(authorsController.getAllAuthors));

router.get("/:authorId", asyncWrapper(authorsController.getAuthorById));

router.get(
  "/:authorId/books",
  asyncWrapper(authorsController.getBooksByAuthorId),
);

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateAuthorDto)],
  asyncWrapper(authorsController.createAuthor),
);

router.patch(
  "/:authorId",
  authMiddleware,
  [validationMiddleware(UpdateAuthorDto)],
  asyncWrapper(authorsController.updateAuthorById),
);

router.delete(
  "/:authorId",
  authMiddleware,
  asyncWrapper(authorsController.deleteAuthorById),
);

export default router;
