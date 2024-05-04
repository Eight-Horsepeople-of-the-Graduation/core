import booksRepository from "../repositories/books.repository";
import { CreateBookDto, UpdateBookDto } from "../dtos";

export const createBook = async (bookData: CreateBookDto) => {
  const book = await booksRepository.createBook(bookData);

  return book;
};

export const getAllBooks = async () => {
  const books = await booksRepository.getAllBooks();

  return books;
};

export const getAllBooksByTitle = async (title: string) => {
  const books = await booksRepository.getAllBooksByTitle(title);

  return books;
};

export const getBookById = async (id: number) => {
  const book = await booksRepository.getBookById(id);

  return book;
};

export const updateBookById = async (
  id: number,
  updatedData: UpdateBookDto
) => {
  const book = getBookById(id);
  if (!book) throw new Error("Book Not Found");

  const createdBook = await booksRepository.updateBookById(id, updatedData);

  return createdBook;
};

export const deleteBookById = async (id: number) => {
  const book = await booksRepository.deleteBookById(id);

  return book;
};

export default {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBookById,
  deleteBookById,
};
