import booksRepository from "../repositories/books.repository";
import { CreateBookDto, UpdateBookDto } from "../dtos";

// create book
export const createBook = async (bookData: CreateBookDto) => {
  const book = await booksRepository.createBook(bookData);
  return book;
};

// view all books
export const getAllBooks = async () => {
  const books = await booksRepository.getAllBooks();
  return books;
};

// view book by title
export const getAllBooksByTitle = async (title: string) => {
  const books = await booksRepository.getAllBooksByTitle(title);
  return books;
};

export const getBookById = async (id: number) => {
  const book = await booksRepository.getBookById(id);
  return book;
};

export const updateBook = async (id: number, updatedData: UpdateBookDto) => {
  const bookId = getBookById(id);
  if (!bookId) throw new Error("Book Not Found");

  const book = await booksRepository.updateBook(id, updatedData);
  return book;
};

export const deleteBook = async (id: number) => {
  const book = await booksRepository.deleteBook(id);
  return book;
};

export default {
  createBook,
  getAllBooks,
  getAllBooksByTitle,
  getBookById,
  updateBook,
  deleteBook,
};
