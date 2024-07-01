import prismaClient from "../utils/prisma";
import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";

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

export const getAuthorById = async (authorId: number) => {
  const author = await prismaClient.author.findUnique({
    where: {
      id: authorId,
    },
  });

  return author;
};

export const createAuthor = async (createAuthorDto: CreateAuthorDto) => {
  const newAuthor = await prismaClient.author.create({
    data: createAuthorDto,
  });

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto
) => {
  const updatedAuthor = await prismaClient.author.update({
    where: {
      id: authorId,
    },
    data: updateAuthorDto,
  });

  return updatedAuthor;
};

export const deleteAuthorById = async (authorId: number) => {
  const deletedAuthor = await prismaClient.author.delete({
    where: {
      id: authorId,
    },
  });

  return deletedAuthor;
};

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
};
