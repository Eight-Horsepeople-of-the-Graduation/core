import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "../exceptions/http.exception";
import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "../interfaces/bookshelves.interface";
import {
  doneReadingInfo,
  getDefaultTitles,
} from "../utils/build-default-bookshelves";
import prismaClient from "../utils/prisma";
import bookshelvesRepository from "../repositories/bookshelves.repository";
import { CreateBookshelfDto, UpdateBookshelfDto } from "../dtos";
import {
  addBookToUserReadingChallenges,
  deleteBookFromUserReadingChallenges,
} from "../repositories/reading-challenges.repository";
import { SearchQueryDto } from "../dtos";

export const getAllBookshelves = async (
  searchQueryDto: SearchQueryDto
): Promise<IBookshelfWithUser[]> => {
  const bookshelves: IBookshelfWithUser[] =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (
  bookshelfId: number
): Promise<IBookshelf> => {
  const bookshelf: OptionalBookshelf =
    await bookshelvesRepository.getBookshelfById(bookshelfId);

  if (!bookshelf) {
    throw new HttpException("Bookshelf not found", HttpStatus.NOT_FOUND);
  }
  return bookshelf;
};

export const createBookshelf = async (
  data: CreateBookshelfDto
): Promise<IBookshelf> => {
  const { userId, title } = data;
  const bookshelvesTitles = (
    await bookshelvesRepository.getBookshelvesByUserId(userId)
  ).map((bookshelf) => bookshelf.title.toLowerCase());

  if (bookshelvesTitles.includes(title.toLowerCase())) {
    throw new HttpException(
      "Bookshelf with this title already exists",
      HttpStatus.CONFLICT
    );
  }

  const bookshelf: IBookshelf =
    await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  bookshelflId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  if (await checkDefaultBookshelf(bookshelflId, doneReadingInfo.title)) {
    console.log("Adding books to default bookshelf");
    return prismaClient.$transaction(async (tx) => {
      const userId = (await getBookshelfById(bookshelflId)).userId;
      console.log("");
      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.addBooksToBookshelf(
          bookshelflId,
          bookIds,
          tx
        );

      for (const bookId of bookIds) {
        await addBookToUserReadingChallenges(userId, bookId, tx);
      }
      return updatedBookshelf;
    });
  } else {
    const updatedBookshelf: IBookshelf =
      await bookshelvesRepository.addBooksToBookshelf(bookshelflId, bookIds);

    return updatedBookshelf;
  }
};

export const removeBooksFromBookshelf = async (
  bookshelflId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  if (await checkDefaultBookshelf(bookshelflId, doneReadingInfo.title)) {
    return prismaClient.$transaction(async (tx) => {
      const userId = (await getBookshelfById(bookshelflId)).userId;

      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.removeBooksFromBookshelf(
          bookshelflId,
          bookIds,
          tx
        );

      for (const bookId of bookIds) {
        await deleteBookFromUserReadingChallenges(userId, bookId, tx);
      }
      return updatedBookshelf;
    });
  } else {
    const updatedBookshelf: IBookshelf =
      await bookshelvesRepository.removeBooksFromBookshelf(
        bookshelflId,
        bookIds
      );

    return updatedBookshelf;
  }
};

export const updateBookshelf = async (
  bookshelfId: number,
  updateBookshelfDto: UpdateBookshelfDto
): Promise<IBookshelf> => {
  if (await checkDefaultBookshelf(bookshelfId)) {
    if (updateBookshelfDto.description || updateBookshelfDto.title) {
      throw new HttpException(
        "You can't update default bookshelves title or description.",
        HttpStatus.FORBIDDEN
      );
    } else {
      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.updateBookshelf(
          bookshelfId,
          updateBookshelfDto
        );

      return updatedBookshelf;
    }
  }

  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.updateBookshelf(
      bookshelfId,
      updateBookshelfDto
    );

  return updatedBookshelf;
};

export const deleteBookshelf = async (
  bookshelfId: number
): Promise<IBookshelfWithoutBooks> => {
  if (await checkDefaultBookshelf(bookshelfId)) {
    throw new HttpException(
      "You can't delete default bookshelves",
      HttpStatus.FORBIDDEN
    );
  }

  const deletedBookshelf: IBookshelfWithoutBooks =
    await bookshelvesRepository.deleteBookshelf(bookshelfId);

  return deletedBookshelf;
};

const checkDefaultBookshelf = async (bookshelfId: number, title?: string) => {
  const bookshelfTitle = (
    await getBookshelfById(bookshelfId)
  ).title.toLowerCase();

  if (title) {
    console.log(title, bookshelfTitle);
    if (title.toLowerCase() === bookshelfTitle) return true;
    else return false;
  }
  return getDefaultTitles().includes(bookshelfTitle);
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
