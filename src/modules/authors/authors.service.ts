import { IAuthor, OptionalAuthor } from "@common/interfaces/authors.interface";
import { IBookWithoutAuthorsAndGenres } from "@common/interfaces/books.interface";
import authorsRepository from "@modules/authors/authors.repository";
import {
  CreateAuthorDto,
  UpdateAuthorDto,
} from "@modules/authors/dtos/authors.dto";
import booksRepository from "@modules/books/books.repository";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllAuthors = async (
  searchQueryDto: SearchQueryDto,
): Promise<IAuthor[]> => {
  const authors = await authorsRepository.getAllAuthors(searchQueryDto);

  return authors;
};

export const getAuthorById = async (
  authorId: number,
): Promise<OptionalAuthor> => {
  const author = await authorsRepository.getAuthorById(authorId);

  return author;
};

export const getBooksByAuthorId = async (
  authorId: number,
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books = await booksRepository.getBooksByAuthorId(authorId);

  return books;
};

export const createAuthor = async (
  createAuthorDto: CreateAuthorDto,
): Promise<IAuthor> => {
  const newAuthor = await authorsRepository.createAuthor(createAuthorDto);

  return newAuthor;
};

export const updateAuthorById = async (
  authorId: number,
  updateAuthorDto: UpdateAuthorDto,
): Promise<IAuthor> => {
  const updatededAuthor = await authorsRepository.updateAuthorById(
    authorId,
    updateAuthorDto,
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
  getBooksByAuthorId,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
};
