import {
  IGenre,
  IGenreWithBooks,
  OptionalGenre,
} from "@common/interfaces/genres.interface";
import prismaClient from "@common/utils/prisma";
import {
  CreateGenreDto,
  UpdateGenreDto,
} from "@modules/genres/dtos/genres.dto";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllGenres = async (
  searchQueryDto: SearchQueryDto
): Promise<IGenreWithBooks[]> => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const genres: IGenreWithBooks[] = await prismaClient.genre.findMany({
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

export const getGenreById = async (genreId: number): Promise<OptionalGenre> => {
  const genre: OptionalGenre = await prismaClient.genre.findUnique({
    where: {
      id: genreId,
    },
  });

  return genre;
};

export const createGenre = async (
  createGenreDto: CreateGenreDto
): Promise<IGenre> => {
  const newGenre: IGenre = await prismaClient.genre.create({
    data: createGenreDto,
  });

  return newGenre;
};

export const getGenresByBookId = async (bookId: number): Promise<IGenre[]> => {
  const genres: IGenre[] = await prismaClient.genre.findMany({
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
): Promise<IGenre> => {
  const updatedGenre: IGenre = await prismaClient.genre.update({
    where: { id: genreId },
    data: updateGenreDto,
  });

  return updatedGenre;
};

export const deleteGenreById = async (genreId: number): Promise<IGenre> => {
  const deletedGenre: IGenre = await prismaClient.genre.delete({
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
