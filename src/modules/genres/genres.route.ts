import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import {
  CreateGenreDto,
  UpdateGenreDto,
} from "@modules/genres/dtos/genres.dto";
import genresController from "@modules/genres/genres.controller";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(genresController.getAllGenres));

router.get("/:genreId", asyncWrapper(genresController.getGenreById));

router.get("/:genreId/books", asyncWrapper(genresController.getBooksByGenreId));

router.post(
  "/",
  [validationMiddleware(CreateGenreDto)],
  asyncWrapper(genresController.createGenre)
);

router.patch(
  "/:genreId",
  [validationMiddleware(UpdateGenreDto)],
  asyncWrapper(genresController.updateGenreById)
);

router.delete("/:genreId", asyncWrapper(genresController.deleteGenreById));

export default router;
