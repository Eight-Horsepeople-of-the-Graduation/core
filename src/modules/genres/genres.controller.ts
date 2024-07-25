import { IBookWithoutAuthorsAndGenres } from "@common/interfaces/books.interface";
import {
  IGenre,
  IGenreWithBooks,
  OptionalGenre,
} from "@common/interfaces/genres.interface";
import genresService from "@modules/genres/genres.service";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

export const getAllGenres = async (
  req: Request,
  res: Response
): Promise<Response<IGenreWithBooks[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const genres = await genresService.getAllGenres(filter);

  return res.send(genres);
};

export const getGenreById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalGenre>> => {
  const genreId = parseInt(req.params.genreId, 10);

  const genre = await genresService.getGenreById(genreId);

  return res.send(genre);
};

export const getBooksByGenreId = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres[]>> => {
  const genreId = parseInt(req.params.genreId, 10);

  const books = await genresService.getBooksByGenreId(genreId);

  return res.send(books);
};

export const createGenre = async (
  req: Request,
  res: Response
): Promise<Response<IGenre>> => {
  const createGenreDto = req.body;

  const newGenre = await genresService.createGenre(createGenreDto);

  return res.status(201).send(newGenre);
};

export const updateGenreById = async (
  req: Request,
  res: Response
): Promise<Response<IGenre>> => {
  const genreId = parseInt(req.params.genreId, 10);

  const updateGenreDto = req.body;

  const updatedGenre = await genresService.updateGenreById(
    genreId,
    updateGenreDto
  );

  return res.send(updatedGenre);
};

export const deleteGenreById = async (
  req: Request,
  res: Response
): Promise<Response<IGenre>> => {
  const genreId = parseInt(req.params.genreId, 10);

  const deletedGenre = await genresService.deleteGenreById(+genreId);

  return res.send(deletedGenre);
};

export default {
  getAllGenres,
  getGenreById,
  getBooksByGenreId,
  createGenre,
  updateGenreById,
  deleteGenreById,
};
