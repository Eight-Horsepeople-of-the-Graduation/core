import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import booksRepository from "@repositories/books.repository";

export const getAllBooks = async (searchQueryDto: SearchQueryDto) => {
  const books = await booksRepository.getAllBooks(searchQueryDto);

  return books;
};

export const getBookById = async (id: number) => {
  const book = await booksRepository.getBookById(id);

  return book;
};

export const createBook = async (createBookDto: CreateBookDto) => {
  const book = await booksRepository.createBook(createBookDto);

  return book;
};

export const updateBookById = async (
  id: number,
  updateBookDto: UpdateBookDto
) => {
  const book = await getBookById(id);
  if (!book) throw new Error("Book Not Found");

  const createdBook = await booksRepository.updateBookById(id, updateBookDto);

  return createdBook;
};

export const deleteBookById = async (id: number) => {
  const book = await booksRepository.deleteBookById(id);

  return book;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
