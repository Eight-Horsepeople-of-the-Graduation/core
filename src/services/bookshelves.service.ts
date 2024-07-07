import { CreateBookshelfDto, SearchQueryDto, UpdateBookshelfDto } from "@dtos";
import bookshelvesRepository from "@repositories/bookshelves.repository";
import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "../interfaces/bookshelves.interface";

export const getAllBookshelves = async (
  searchQueryDto: SearchQueryDto
): Promise<IBookshelfWithUser[]> => {
  const bookshelves: IBookshelfWithUser[] =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (bookshelfId: number): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf = await bookshelvesRepository.getBookshelfById(bookshelfId);

  return bookshelf;
};


export const createBookshelf = async (
  data: CreateBookshelfDto
): Promise<IBookshelf> => {
  const bookshelf: IBookshelf =
    await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  booksheflId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.addBooksToBookshelf(booksheflId, bookIds);

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  bookshelfId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.removeBooksFromBookshelf(bookshelfId, bookIds);

  return updatedBookshelf;
};

export const updateBookshelf = async (
  bookshelfId: number,
  updateBookshelfDto: UpdateBookshelfDto
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.updateBookshelf(bookshelfId, updateBookshelfDto);

  return updatedBookshelf;
};

export const deleteBookshelf = async (
  bookshelfId: number
): Promise<IBookshelfWithoutBooks> => {
  const deletedBookshelf: IBookshelfWithoutBooks =
   
    await bookshelvesRepository.deleteBookshelf(bookshelfId);

  return deletedBookshelf;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  createBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
