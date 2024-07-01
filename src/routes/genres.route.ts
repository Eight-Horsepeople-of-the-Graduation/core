import { Router } from "express";
import genresController from "../controllers/genres.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import asyncWrapper from "../utils/async-wrapper";
import { CreateGenreDto, UpdateGenreDto } from "../dtos/genres.dto";

const router = Router();

router.get("/", asyncWrapper(genresController.getAllGenres));

router.get("/:genreId", asyncWrapper(genresController.getGenreById));

router.post(
  "/",
  [validationMiddleware(CreateGenreDto)],
  asyncWrapper(genresController.createGenre)
);

router.put(
  "/:genreId",
  [validationMiddleware(UpdateGenreDto)],
  asyncWrapper(genresController.updateGenreById)
);

router.delete("/:genreId", asyncWrapper(genresController.deleteGenreById));

export default router;
