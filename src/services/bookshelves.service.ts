import {
  CreateBookshelfDto,
  GetBookshelfByIdDto,
  SearchQueryDto,
  UpdateBookshelfDto,
} from "../dtos";
import bookshelvesRepository from "../repositories/bookshelves.repository";

export const getAllBookshelves = async (searchQueryDto: SearchQueryDto) => {
  const bookshelves =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (
  getBookshelfByIdDto: GetBookshelfByIdDto
) => {
  const bookshelf =
    await bookshelvesRepository.getBookshelfById(getBookshelfByIdDto);

  return bookshelf;
};

export const getBookshelvesByUserId = async (userId: number) => {
  const bookshelves =
    await bookshelvesRepository.getBookshelvesByUserId(userId);

  return bookshelves;
};

export const createBookshelf = async (data: CreateBookshelfDto) => {
  const bookshelf = await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  id: GetBookshelfByIdDto,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelvesRepository.addBooksToBookshelf(
    id,
    bookIds
  );

  return updatedBookshelf;
};

export const removeBooksFromBookshelf = async (
  id: GetBookshelfByIdDto,
  bookIds: number[]
) => {
  const updatedBookshelf = await bookshelvesRepository.removeBooksFromBookshelf(
    id,
    bookIds
  );

  return updatedBookshelf;
};

export const updateBookshelf = async (
  id: GetBookshelfByIdDto,
  updateBookshelfDto: UpdateBookshelfDto
) => {
  const updatedBookshelf = await bookshelvesRepository.updateBookshelf(
    id,
    updateBookshelfDto
  );

  return updatedBookshelf;
};

export const deleteBookshelf = async (id: GetBookshelfByIdDto) => {
  const deletedBookshelf = await bookshelvesRepository.deleteBookshelf(id);

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
