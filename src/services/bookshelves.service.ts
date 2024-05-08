import {
  CreateBookshelfDto,
  GetBookshelvesByIdDto,
  GetBookshelvesByTitleDto,
  UpdateBookshelvesDto,
} from "../dtos/bookshelves.dto";
import bookshelfRepository from "../repositories/bookshelves.repository";

export const getAllBookshelves = async (sort?: string) => {
  const bookshelves = await bookshelfRepository.getAllBookshelves();

  return bookshelves;
};

export const getBookshelfById = async (data: GetBookshelvesByIdDto) => {
  const bookshelf = await bookshelfRepository.getBookshelfById(data);

  return bookshelf;
};

export const getBookshelvesByTitle = async (data: GetBookshelvesByTitleDto) => {
  const bookshelves = await bookshelfRepository.getBookshelvesByTitle(data);

  return bookshelves;
};

export const getBookshelvesByUserId = async (userId: number) => {
  const bookshelves = await bookshelfRepository.getBookshelvesByUserId(userId);

  return bookshelves;
};

export const createBookshelf = async (data: CreateBookshelfDto) => {
  const bookshelf = await bookshelfRepository.createBookshelf(data);

  return bookshelf;
};

export const updateBookshelf = async (
  id: GetBookshelvesByIdDto,
  updatedData: UpdateBookshelvesDto
) => {
  const updatedBookshelf = await bookshelfRepository.updateBookshelf(
    id,
    updatedData
  );

  return updatedBookshelf;
};

export const addBookToBookshelf = async (
  id: GetBookshelvesByIdDto,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelfRepository.addBooksToBookshelf(
    id,
    bookIds
  );

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  id: GetBookshelvesByIdDto,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelfRepository.removeBooksFromBookshelf(
    id,
    bookIds
  );

  return updatedBookshelf;
};

// delete bookshelf
export const deleteBookshelf = async (id: GetBookshelvesByIdDto) => {
  const deletedBookshelf = await bookshelfRepository.deleteBookshelf(id);

  return deletedBookshelf;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByTitle,
  getBookshelvesByUserId,
  createBookshelf,
  updateBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  deleteBookshelf,
};
