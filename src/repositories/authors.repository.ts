import prismaClient from "../utils/prisma";
import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";
import { IAuthor, OptionalAuthor } from "../interfaces/authors.interface";

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
};
