import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "@dtos";
import booksRepository from "@repositories/books.repository";
import {
  IBook,
  OptionalBook,
} from "../interfaces/books.interface";

export const getAllBooks = async (
  searchQueryDto: SearchQueryDto
): Promise<IBook[]> => {
  const books = await booksRepository.getAllBooks(searchQueryDto);

  return books;
};

export const getBookById = async (genreId: number): Promise<OptionalBook> => {
  const book = await booksRepository.getBookById(genreId);

  return book;
};

export const createBook = async (
  createBookDto: CreateBookDto
): Promise<IBook> => {
  const newBook = await booksRepository.createBook(createBookDto);

  return newBook;
};

export const updateBookById = async (
  bookId: number,
  updateBookDto: UpdateBookDto
): Promise<IBook> => {
  const updatedBook = await booksRepository.updateBookById(
    bookId,
    updateBookDto
  );

  return updatedBook;
};

export const deleteBookById = async (
  bookId: number
): Promise<IBook> => {
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
