import genresService from "../services/genres.service";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { SearchQueryDto } from "../dtos/search.dto";

export const getAllGenres = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const genres = await genresService.getAllGenres(filter);

  return res.send(genres);
};

export const getGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.genreId, 10);

  const genre = await genresService.getGenreById(genreId);

  return res.send(genre);
};

export const createGenre = async (req: Request, res: Response) => {
  const createGenreDto = req.body;

  const newGenre = await genresService.createGenre(createGenreDto);

  return res.status(201).send(newGenre);
};

export const updateGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.genreId, 10);
  const updateGenreDto = req.body;

  const updatedGenre = await genresService.updateGenreById(
    genreId,
    updateGenreDto
  );

  return res.send(updatedGenre);
};

export const deleteGenreById = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.genreId, 10);

  const deletedGenre = await genresService.deleteGenreById(+genreId);

  return res.send(deletedGenre);
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreById,
  deleteGenreById,
};
