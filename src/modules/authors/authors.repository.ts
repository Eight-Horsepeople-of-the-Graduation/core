import { IAuthor, OptionalAuthor } from "@common/interfaces/authors.interface";
import prismaClient from "@common/utils/prisma";
import {
  CreateAuthorDto,
  UpdateAuthorDto,
} from "@modules/authors/dtos/authors.dto";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllAuthors = async (
  searchQueryDto: SearchQueryDto
): Promise<IAuthor[]> => {
  const authors: IAuthor[] = await prismaClient.author.findMany({
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

export const getAuthorById = async (
  authorId: number
): Promise<OptionalAuthor> => {
  const author: OptionalAuthor = await prismaClient.author.findUnique({
    where: {
      id: authorId,
    },
  });

  return author;
};

export const getAuthorsByBookId = async (bookId: number) => {
  const authors = await prismaClient.author.findMany({
    where: {
      books: {
        some: {
          id: bookId,
        },
      },
    },
  });

  return authors;
};

export const createAuthor = async (
  createAuthorDto: CreateAuthorDto
): Promise<IAuthor> => {
  const newAuthor: IAuthor = await prismaClient.author.create({
    data: createAuthorDto,
  });

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto
): Promise<IAuthor> => {
  const updatedAuthor: IAuthor = await prismaClient.author.update({
    where: {
      id: authorId,
    },
    data: updateAuthorDto,
  });

  return updatedAuthor;
};

export const deleteAuthorById = async (authorId: number): Promise<IAuthor> => {
  const deletedAuthor: IAuthor = await prismaClient.author.delete({
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
  getAuthorsByBookId,
};
