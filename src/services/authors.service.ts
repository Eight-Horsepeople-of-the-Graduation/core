import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";
import authorsRepository from "../repositories/authors.repository";

export const getAllAuthors = async (SearchQueryDto: SearchQueryDto) => {
  const authors = await authorsRepository.getAllAuthors(SearchQueryDto);

  return authors;
};

export const getAuthorById = async (authorId: number) => {
  const author = await authorsRepository.getAuthorById(authorId);

  return author;
};

export const createAuthor = async (createAuthorDto: CreateAuthorDto) => {
  const newAuthor = await authorsRepository.createAuthor(createAuthorDto);

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto
) => {
  const updatededAuthor = await authorsRepository.updateAuthorById(
    authorId,
    updateAuthorDto
  );

  return updatededAuthor;
};

export const deleteAuthorById = async (authorId: number) => {
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
