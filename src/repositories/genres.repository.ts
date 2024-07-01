import prismaClient from "../utils/prisma";
import { CreateGenreDto, SearchQueryDto, UpdateGenreDto } from "../dtos";

export const getAllGenres = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const genres = await prismaClient.genre.findMany({
    where: {
      ...(term && {
        title: {
          contains: term,
          mode: "insensitive",
        },
      }),
    },
    skip,
    take: limit,
    include: {
      books: true,
    },
  });

  return genres;
};

export const getGenreById = async (genreId: number) => {
  const genre = await prismaClient.genre.findUnique({
    where: {
      id: genreId,
    },
  });

  return genre;
};

export const createGenre = async (createGenreDto: CreateGenreDto) => {
  const newGenre = await prismaClient.genre.create({
    data: createGenreDto,
  });

  return newGenre;
};

export const getGenresByBookId = async (bookId: number) => {
  const genres = await prismaClient.genre.findMany({
    where: {
      books: {
        some: {
          id: bookId,
        },
      },
    },
  });

  return genres;
};

export const updateGenreById = async (
  genreId: number,
  updateGenreDto: UpdateGenreDto
) => {
  const updatedGenre = await prismaClient.genre.update({
    where: { id: genreId },
    data: updateGenreDto,
  });

  return updatedGenre;
};

export const deleteGenreById = async (genreId: number) => {
  const deletedGenre = await prismaClient.genre.delete({
    where: { id: genreId },
  });

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
