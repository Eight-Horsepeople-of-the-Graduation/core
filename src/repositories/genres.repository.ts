import prismaClient from "@utils/prisma";
import { SearchQueryDto } from "@dtos";

export const getAllGenres = async (searchQueryDto: SearchQueryDto) => {
  const genres = await prismaClient.genre.findMany({
    where: {
      ...(searchQueryDto.term && {
        title: {
          contains: searchQueryDto.term,
          mode: "insensitive",
        },
      }),
    },
  });

  return genres;
};
export const getGenreById = async (id: number) => {
  const genre = await prismaClient.genre.findUnique({
    where: {
      id: id,
    },
  });

  return genre;
};

export const createGenre = async (genreData: any) => {
  const genre = await prismaClient.genre.create({
    data: genreData,
  });

  return genre;
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

export const updateGenreById = async (id: number, updatedData: any) => {
  const genre = await prismaClient.genre.update({
    where: { id },
    data: updatedData,
  });

  return genre;
};

export const deleteGenreById = async (id: number) => {
  const genre = await prismaClient.genre.delete({
    where: { id },
  });

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
