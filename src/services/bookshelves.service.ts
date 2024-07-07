import { CreateBookshelfDto, SearchQueryDto, UpdateBookshelfDto } from "@dtos";
import bookshelvesRepository from "@repositories/bookshelves.repository";

export const getAllBookshelves = async (searchQueryDto: SearchQueryDto) => {
  const bookshelves =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (bookshelfId: number) => {
  const bookshelf = await bookshelvesRepository.getBookshelfById(bookshelfId);

  return bookshelf;
};

export const createBookshelf = async (data: CreateBookshelfDto) => {
  const bookshelf = await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  booksheflId: number,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelvesRepository.addBooksToBookshelf(
    booksheflId,
    bookIds
  );

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  bookshelfId: number,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelvesRepository.removeBooksFromBookshelf(
    bookshelfId,
    bookIds
  );

  return updatedBookshelf;
};

export const updateBookshelf = async (
  bookshelfId: number,
  updateBookshelfDto: UpdateBookshelfDto
) => {
  const updatedBookshelf = await bookshelvesRepository.updateBookshelf(
    bookshelfId,
    updateBookshelfDto
  );

  return updatedBookshelf;
};

export const deleteBookshelf = async (bookshelfId: number) => {
  const deletedBookshelf =
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
