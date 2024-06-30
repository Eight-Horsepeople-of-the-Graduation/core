import genresRepository from "@repositories/genres.repository";
import { CreateGenreDto, SearchQueryDto, UpdateGenreDto } from "@dtos";

export const getAllGenres = async (searchQueryDto: SearchQueryDto) => {
  const genres = await genresRepository.getAllGenres(searchQueryDto);

  return genres;
};

export const getGenreById = async (genreId: number) => {
  const genre = await genresRepository.getGenreById(genreId);

  return genre;
};

export const createGenre = async (createGenreDto: CreateGenreDto) => {
  const newGenre = await genresRepository.createGenre(createGenreDto);

  return newGenre;
};

export const getGenresByBookId = async (bookId: number) => {
  const genres = await genresRepository.getGenresByBookId(bookId);

  return genres;
};

export const updateGenreById = async (
  genreId: number,
  updateGnereDto: UpdateGenreDto
) => {
  const updatedGenre = await genresRepository.updateGenreById(
    genreId,
    updateGnereDto
  );

  return updatedGenre;
};

export const deleteGenreById = async (genreId: number) => {
  const deletedGenre = await genresRepository.deleteGenreById(genreId);

  return deletedGenre;
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  getGenresByBookId,
  updateGenreById,
  deleteGenreById,
};
