import genresRepository from "@repositories/genres.repository";
import { CreateGenreDto, SearchQueryDto, UpdateGenreDto } from "@dtos";
import {
  IGenre,
  IGenreWithBooks,
  OptionalGenre,
} from "../interfaces/genres.interface";
import booksRepository from "@repositories/books.repository";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
} from "../interfaces/books.interface";

export const getAllGenres = async (
  searchQueryDto: SearchQueryDto
): Promise<IGenreWithBooks[]> => {
  const genres = await genresRepository.getAllGenres(searchQueryDto);

  return genres;
};

export const getGenreById = async (genreId: number): Promise<OptionalGenre> => {
  const genre = await genresRepository.getGenreById(genreId);

  return genre;
};

export const getBooksByGenreId = async (
  genreId: number
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books = await booksRepository.getBooksByGenreId(genreId);

  return books;
};

export const createGenre = async (
  createGenreDto: CreateGenreDto
): Promise<IGenre> => {
  const newGenre = await genresRepository.createGenre(createGenreDto);

  return newGenre;
};

export const updateGenreById = async (
  genreId: number,
  updateGenreDto: UpdateGenreDto
): Promise<IGenre> => {
  const updatedGenre = await genresRepository.updateGenreById(
    genreId,
    updateGenreDto
  );

  return updatedGenre;
};

export const deleteGenreById = async (genreId: number): Promise<IGenre> => {
  const deletedGenre = await genresRepository.deleteGenreById(genreId);

  return deletedGenre;
};

export default {
  getAllGenres,
  getGenreById,
  getBooksByGenreId,
  createGenre,
  updateGenreById,
  deleteGenreById,
};
