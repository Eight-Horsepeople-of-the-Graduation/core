import { Router } from "express";
import authorsController from "@controllers/authors.controller";
import asyncWrapper from "@utils/async-wrapper";
import { validationMiddleware } from "@middleware/validation.middleware";
import { CreateAuthorDto, UpdateAuthorDto } from "@dtos";

const router = Router();

router.get("/", asyncWrapper(authorsController.getAllAuthors));

router.get("/:id", asyncWrapper(authorsController.getAuthorById));

router.post(
  "/",
  [validationMiddleware(CreateAuthorDto)],
  asyncWrapper(authorsController.createAuthor)
);

router.put(
  "/:id",
  [validationMiddleware(UpdateAuthorDto)],
  asyncWrapper(authorsController.updateAuthorById)
);

router.delete("/:id", asyncWrapper(authorsController.deleteAuthorById));

export default router;
