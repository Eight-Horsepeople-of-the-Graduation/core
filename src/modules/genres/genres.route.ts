import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import { CreateGenreDto } from "@modules/genres/dtos/create-genre.dto";
import { UpdateGenreDto } from "@modules/genres/dtos/update-genre.dto";
import genresController from "@modules/genres/genres.controller";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(genresController.getAllGenres));

router.get("/:genreId", asyncWrapper(genresController.getGenreById));

router.get("/:genreId/books", asyncWrapper(genresController.getBooksByGenreId));

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateGenreDto)],
  asyncWrapper(genresController.createGenre)
);

router.patch(
  "/:genreId",
  authMiddleware,
  [validationMiddleware(UpdateGenreDto)],
  asyncWrapper(genresController.updateGenreById)
);

router.delete(
  "/:genreId",
  authMiddleware,
  asyncWrapper(genresController.deleteGenreById)
);

export default router;
