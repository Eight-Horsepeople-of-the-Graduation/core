import genresRepository from "@repositories/genres.repository";
import { CreateGenreDto, SearchQueryDto, UpdateGenreDto } from "@dtos";

export const getAllGenres = async (searchQueryDto: SearchQueryDto) => {
  const genres = await genresRepository.getAllGenres(searchQueryDto);

  return genres;
};

export const getGenreById = async (id: number) => {
  const genre = await genresRepository.getGenreById(id);

  return genre;
};

export const createGenre = async (createGenreDto: CreateGenreDto) => {
  const genre = await genresRepository.createGenre(createGenreDto);

  return genre;
};

export const getGenresByBookId = async (bookId: number) => {
  const genres = await genresRepository.getGenresByBookId(bookId);

  return genres;
};

export const updateGenreById = async (
  id: number,
  UpdateGenreDto: UpdateGenreDto
) => {
  const genre = await getGenreById(id);
  if (!genre) throw new Error("Genre Not Found");
  const createdGenre = await genresRepository.updateGenreById(
    id,
    UpdateGenreDto
  );

  return createdGenre;
};

export const deleteGenreById = async (id: number) => {
  const genre = await genresRepository.deleteGenreById(id);

  return genre;
};

export default {
  getAllGenres,
  getGenreById,
  createGenre,
  getGenresByBookId,
  updateGenreById,
  deleteGenreById,
};
