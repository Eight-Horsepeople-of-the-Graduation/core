import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "@common/interfaces/bookshelves.interface";
import {
  doneReadingInfo,
  getDefaultTitles,
} from "@common/utils/build-default-bookshelves";
import prismaClient from "@common/utils/prisma";
import bookshelvesRepository from "@modules/bookshelves/bookshelves.repository";
import {
  CreateBookshelfDto,
  UpdateBookshelfDto,
} from "@modules/bookshelves/dtos/bookshelves.dto";
import {
  addBookToUserReadingChallenges,
  deleteBookFromUserReadingChallenges,
} from "@modules/reading-challenges/reading-challenges.repository";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";

export const getAllBookshelves = async (
  searchQueryDto: SearchQueryDto,
): Promise<IBookshelfWithUser[]> => {
  const bookshelves: IBookshelfWithUser[] =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (
  bookshelfId: number,
): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf =
    await bookshelvesRepository.getBookshelfById(bookshelfId);

  return bookshelf;
};

export const createBookshelf = async (
  data: CreateBookshelfDto,
): Promise<IBookshelf> => {
  const { userId, title } = data;
  const bookshelvesTitles = (
    await bookshelvesRepository.getBookshelvesByUserId(userId)
  ).map((bookshelf) => bookshelf.title.toLowerCase());

  if (bookshelvesTitles.includes(title.toLowerCase())) {
    throw new HttpException(
      "Bookshelf with this title already exists",
      HttpStatus.CONFLICT,
    );
  }

  const bookshelf: IBookshelf =
    await bookshelvesRepository.createBookshelf(data);

  return bookshelf;
};

export const addBookToBookshelf = async (
  bookshelfId: number,
  bookIds: number[],
): Promise<IBookshelf> => {
  if (checkDefaultBookshelf(bookshelfId, doneReadingInfo.title)) {
    return prismaClient.$transaction(async (tx) => {
      const userId = (await bookshelvesRepository.getBookshelfById(bookshelfId))
        .userId;

      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.addBooksToBookshelf(
          bookshelfId,
          bookIds,
          tx,
        );

      for (const bookId of bookIds) {
        await addBookToUserReadingChallenges(userId, bookId, tx);
      }
      return updatedBookshelf;
    });
  } else {
    const updatedBookshelf: IBookshelf =
      await bookshelvesRepository.addBooksToBookshelf(bookshelfId, bookIds);

    return updatedBookshelf;
  }
};

export const removeBooksFromBookshelf = async (
  bookshelfId: number,
  bookIds: number[],
): Promise<IBookshelf> => {
  if (checkDefaultBookshelf(bookshelfId, doneReadingInfo.title)) {
    return prismaClient.$transaction(async (tx) => {
      const userId = (await bookshelvesRepository.getBookshelfById(bookshelfId))
        .userId;

      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.removeBooksFromBookshelf(
          bookshelfId,
          bookIds,
          tx,
        );

      for (const bookId of bookIds) {
        await deleteBookFromUserReadingChallenges(userId, bookId, tx);
      }
      return updatedBookshelf;
    });
  } else {
    const updatedBookshelf: IBookshelf =
      await bookshelvesRepository.removeBooksFromBookshelf(
        bookshelfId,
        bookIds,
      );

    return updatedBookshelf;
  }
};

export const updateBookshelf = async (
  bookshelfId: number,
  updateBookshelfDto: UpdateBookshelfDto,
): Promise<IBookshelf> => {
  if (checkDefaultBookshelf(bookshelfId)) {
    if (updateBookshelfDto.description || updateBookshelfDto.title) {
      throw new HttpException(
        "You can't update default bookshelves title or description.",
        HttpStatus.FORBIDDEN,
      );
    } else {
      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.updateBookshelf(
          bookshelfId,
          updateBookshelfDto,
        );

      return updatedBookshelf;
    }
  }

  const updatedBookshelf: IBookshelf =
    await bookshelvesRepository.updateBookshelf(
      bookshelfId,
      updateBookshelfDto,
    );

  return updatedBookshelf;
};

export const deleteBookshelf = async (
  bookshelfId: number,
): Promise<IBookshelfWithoutBooks> => {
  if (checkDefaultBookshelf(bookshelfId)) {
    throw new HttpException(
      "You can't delete default bookshelves",
      HttpStatus.FORBIDDEN,
    );
  }

  const deletedBookshelf: IBookshelfWithoutBooks =
    await bookshelvesRepository.deleteBookshelf(bookshelfId);

  return deletedBookshelf;
};

const checkDefaultBookshelf = async (bookshelfId: number, title?: string) => {
  const bookshelfTitle = (
    await bookshelvesRepository.getBookshelfById(bookshelfId)
  ).title.toLowerCase();

  if (title) {
    if (title === bookshelfTitle) return true;
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
