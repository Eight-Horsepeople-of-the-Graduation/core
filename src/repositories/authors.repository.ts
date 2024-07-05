import prismaClient from "@utils/prisma";
import { prismaWrapper } from "@utils/prisma-wrapper";
import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "@dtos";

export const getAllAuthors = async (searchQueryDto: SearchQueryDto) => {
  const authors = await prismaWrapper(prismaClient.author.findMany, {
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
  const author = await prismaWrapper(prismaClient.author.findUnique, {
    where: {
      id: authorId,
    },
  });

  return author;
};

export const createAuthor = async (createAuthorDto: CreateAuthorDto) => {
  const newAuthor = await prismaWrapper(prismaClient.author.create, {
    data: createAuthorDto,
  });

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto
) => {
  const updatedAuthor = await prismaWrapper(prismaClient.author.update, {
    where: {
      id: authorId,
    },
    data: updateAuthorDto,
  });

  return updatedAuthor;
};

export const deleteAuthorById = async (authorId: number) => {
  const deletedAuthor = await prismaWrapper(prismaClient.author.delete, {
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
