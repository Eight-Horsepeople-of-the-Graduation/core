import { Router } from "express";
import authorsController from "@controllers/authors.controller";
import asyncWrapper from "@utils/async-wrapper";
import { validationMiddleware } from "@middleware/validation.middleware";
import { CreateAuthorDto, UpdateAuthorDto } from "@dtos";

const router = Router();

router.get("/", asyncWrapper(authorsController.getAllAuthors));

router.get("/:authorId", asyncWrapper(authorsController.getAuthorById));

router.post(
  "/",
  [validationMiddleware(CreateAuthorDto)],
  asyncWrapper(authorsController.createAuthor)
);

router.put(
  "/:authorId",
  [validationMiddleware(UpdateAuthorDto)],
  asyncWrapper(authorsController.updateAuthorById)
);

router.delete("/:authorId", asyncWrapper(authorsController.deleteAuthorById));

export default router;
