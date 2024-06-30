import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import booksRepository from "@repositories/books.repository";

export const getAllBooks = async (searchQueryDto: SearchQueryDto) => {
  const books = await booksRepository.getAllBooks(searchQueryDto);

  return books;
};

export const getBookById = async (genreId: number) => {
  const book = await booksRepository.getBookById(genreId);

  return book;
};

export const createBook = async (createBookDto: CreateBookDto) => {
  const newBook = await booksRepository.createBook(createBookDto);

  return newBook;
};

export const updateBookById = async (
  bookId: number,
  updateBookDto: UpdateBookDto
) => {
  const updatedBook = await booksRepository.updateBookById(
    bookId,
    updateBookDto
  );

  return updatedBook;
};

export const deleteBookById = async (bookId: number) => {
  const deletedBook = await booksRepository.deleteBookById(bookId);

  return deletedBook;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
