import {
  CreateBookshelfDto,
  GetBookshelfByIdDto,
  SearchQueryDto,
  UpdateBookshelfDto,
} from "@dtos";
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

export const getBookshelfById = async (
  getBookshelfByIdDto: GetBookshelfByIdDto
): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf =
    await bookshelvesRepository.getBookshelfById(getBookshelfByIdDto);

  return bookshelf;
};

export const getBookshelvesByUserId = async (
  userId: number
): Promise<IBookshelf[]> => {
  const bookshelves: IBookshelf[] =
    await bookshelvesRepository.getBookshelvesByUserId(userId);

  return bookshelves;
};

export const createBookshelf = async (
  data: CreateBookshelfDto
): Promise<IBookshelf> => {
  const bookshelf: IBookshelf =
    await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  id: GetBookshelfByIdDto,
  bookIds: number[]
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.addBooksToBookshelf(id, bookIds);

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  id: GetBookshelfByIdDto,
  bookIds: number[]
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.removeBooksFromBookshelf(id, bookIds);

  return updatedBookshelf;
};

export const updateBookshelf = async (
  id: GetBookshelfByIdDto,
  updateBookshelfDto: UpdateBookshelfDto
): Promise<IBookshelf> => {
  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.updateBookshelf(id, updateBookshelfDto);

  return updatedBookshelf;
};

export const deleteBookshelf = async (
  id: GetBookshelfByIdDto
): Promise<IBookshelfWithoutBooks> => {
  const deletedBookshelf: IBookshelfWithoutBooks =
    await bookshelvesRepository.deleteBookshelf(id);

  return deletedBookshelf;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByUserId,
  createBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
};
