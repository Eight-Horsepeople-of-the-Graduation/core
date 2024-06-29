import prismaClient from "@utils/prisma";
import { SearchQueryDto } from "@dtos";

export const getAllAuthors = async (searchQueryDto: SearchQueryDto) => {
  const authors = await prismaClient.author.findMany({
    where: {
      ...(searchQueryDto.term && {
        name: {
          contains: searchQueryDto.term,
          mode: "insensitive",
        },
      }),
    },
  });

  return authors;
};

export const getAuthorById = async (id: number) => {
  const author = await prismaClient.author.findUnique({
    where: {
      id: id,
    },
  });

  return author;
};

export const createAuthor = async (authorData: any) => {
  const author = await prismaClient.author.create({
    data: authorData,
  });

  return author;
};

export const updateAuthorById = async (id: number, updatedData: any) => {
  const author = await prismaClient.author.update({
    where: {
      id: id,
    },
    data: updatedData,
  });

  return author;
};

export const deleteAuthorById = async (id: number) => {
  const author = await prismaClient.author.delete({
    where: {
      id: id,
    },
  });

  return author;
};

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
};
