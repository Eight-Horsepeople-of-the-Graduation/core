import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";
import authorsRepository from "../repositories/authors.repository";
import { IAuthor, OptionalAuthor } from "../interfaces/authors.interface";

export const getAllAuthors = async (
  SearchQueryDto: SearchQueryDto
): Promise<IAuthor[]> => {
  const authors = await authorsRepository.getAllAuthors(SearchQueryDto);

  return authors;
};

export const getAuthorById = async (
  authorId: number
): Promise<OptionalAuthor> => {
  const author = await authorsRepository.getAuthorById(authorId);

  return author;
};

export const createAuthor = async (
  createAuthorDto: CreateAuthorDto
): Promise<IAuthor> => {
  const newAuthor = await authorsRepository.createAuthor(createAuthorDto);

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto
): Promise<IAuthor> => {
  const updatededAuthor = await authorsRepository.updateAuthorById(
    authorId,
    updateAuthorDto
  );

  return updatededAuthor;
};

export const deleteAuthorById = async (authorId: number): Promise<IAuthor> => {
  const deletedAuthor = await authorsRepository.deleteAuthorById(authorId);

  return deletedAuthor;
};

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
};
