import genresService from "@services/genres.service";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { SearchQueryDto } from "../dtos/search.dto";
import { GetGenreByIdDto, UpdateGenreDto } from "../dtos/genres.dto";

export const getAllGenres = async (req: Request, res: Response) => {
  const genres = await genresService.getAllGenres(req.query);

  return res.send(genres);
};

export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data: GetGenreByIdDto = { id: +id };

  const genre = await genresService.getGenreById(data.id);
  if (!genre) return res.status(400).send("genre Not Found");

  return res.send(genre);
};

export const createGenre = async (req: Request, res: Response) => {
  const genreData = req.body;

  const genre = await genresService.createGenre(genreData);

  return res.status(201).send(genre);
};

export const updateGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateGenreDto = req.body;

  const genre = await genresService.updateGenreById(+id, data);

  return res.send(genre);
};

export const deleteGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await genresService.deleteGenreById(+id);

  return res.send(genre);
};

export const getGenresByBookId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: GetGenreByIdDto = { id: +id };
  const genre = await genresService.deleteGenreById(data.id);

  return res.send(genre);
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreById,
  deleteGenreById,
  getGenresByBookId,
};
