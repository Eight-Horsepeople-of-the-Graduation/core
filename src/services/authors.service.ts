import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "@dtos";
import authorsRepository from "@repositories/authors.repository";

export const getAllAuthors = async (SearchQueryDto: SearchQueryDto) => {
  const authors = await authorsRepository.getAllAuthors(SearchQueryDto);

  return authors;
};

export const getAuthorById = async (id: number) => {
  const author = await authorsRepository.getAuthorById(id);

  return author;
};

export const createAuthor = async (createAuthorDto: CreateAuthorDto) => {
  const author = await authorsRepository.createAuthor(createAuthorDto);

  return author;
};

export const updateAuthorById = async (
  id: number,
  updateAuthorDto: UpdateAuthorDto
) => {
  const author = await getAuthorById(id);
  if (!author) throw new Error("Author Not Found");

  const updatededAuthor = await authorsRepository.updateAuthorById(
    id,
    updateAuthorDto
  );
  return updatededAuthor;
};

export const deleteAuthorById = async (id: number) => {
  const author = await authorsRepository.deleteAuthorById(id);

  return author;
};

export default {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
};
