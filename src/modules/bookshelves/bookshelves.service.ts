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
import booksRepository from "@modules/books/books.repository";
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
  searchQueryDto: SearchQueryDto
): Promise<IBookshelfWithUser[]> => {
  const bookshelves: IBookshelfWithUser[] =
    await bookshelvesRepository.getAllBookshelves(searchQueryDto);

  return bookshelves;
};

export const getBookshelfById = async (
  bookshelfId: number
): Promise<OptionalBookshelf> => {
  const bookshelf: OptionalBookshelf =
    await bookshelvesRepository.getBookshelfById(bookshelfId);

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
//add to Done, remove from currently reading or
export const addBookToBookshelf = async (
  bookshelfId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  //Check if the target bookshelf is a default bookshelf
  const getBookshelfIfDefault = await _getBookshelfIfDefault(bookshelfId);
  //If it's a default bookshelf, remove the books from any default bookshelves they are in
  if (getBookshelfIfDefault) {
    for (const bookId of bookIds) {
      const bookShelvesTheBookIn =
        await bookshelvesRepository.getBookshelvesByBookId(bookId);
      const defaultBookshelvesTheBookIn = bookShelvesTheBookIn.filter(
        (bookshelf) =>
          getDefaultTitles().includes(bookshelf.title.toLowerCase())
      );
      for (const defaultBookshelf of defaultBookshelvesTheBookIn) {
        await removeBooksFromBookshelf(defaultBookshelf.id, [bookId]);
      }
    }
  }

  // If it is the Done Reading bookshelf, add it to the existing challenges too
  if (
    getBookshelfIfDefault &&
    getBookshelfIfDefault.title.toLowerCase() ==
      doneReadingInfo.title.toLowerCase()
  ) {
    return prismaClient.$transaction(async (tx) => {
      const userId = (await bookshelvesRepository.getBookshelfById(bookshelfId))
        .userId;

      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.addBooksToBookshelf(
          bookshelfId,
          bookIds,
          tx
        );

      for (const bookId of bookIds) {
        await addBookToUserReadingChallenges(userId, bookId, tx);
      }
      return updatedBookshelf;
    });
  } else {
    //Simply ad the books
    const updatedBookshelf: IBookshelf =
      await bookshelvesRepository.addBooksToBookshelf(bookshelfId, bookIds);

    return updatedBookshelf;
  }
};

export const removeBooksFromBookshelf = async (
  bookshelfId: number,
  bookIds: number[]
): Promise<IBookshelf> => {
  if (await _getBookshelfIfDefault(bookshelfId, doneReadingInfo.title)) {
    return prismaClient.$transaction(async (tx) => {
      const userId = (await bookshelvesRepository.getBookshelfById(bookshelfId))
        .userId;

      const updatedBookshelf: IBookshelf =
        await bookshelvesRepository.removeBooksFromBookshelf(
          bookshelfId,
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
        bookshelfId,
        bookIds
      );

    return updatedBookshelf;
  }
};

export const updateBookshelf = async (
  bookshelfId: number,
  updateBookshelfDto: UpdateBookshelfDto
): Promise<IBookshelf> => {
  if (await _getBookshelfIfDefault(bookshelfId)) {
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
  if (await _getBookshelfIfDefault(bookshelfId)) {
    throw new HttpException(
      "You can't delete default bookshelves",
      HttpStatus.FORBIDDEN
    );
  }

  const deletedBookshelf: IBookshelfWithoutBooks =
    await bookshelvesRepository.deleteBookshelf(bookshelfId);

  return deletedBookshelf;
};

const _getBookshelfIfDefault = async (bookshelfId: number, title?: string) => {
  const bookshelf = await bookshelvesRepository.getBookshelfById(bookshelfId);
  if(!bookshelf) return null;
  const bookshelfTitle = bookshelf.title.toLowerCase();
  if (title) {
    if (title === bookshelfTitle) return bookshelf;
    else return null;
  }
  if (getDefaultTitles().includes(bookshelfTitle)) return bookshelf;
  else return null;
};

export default {
  getAllBookshelves,
  getBookshelfById,
  createBookshelf,
  addBookToBookshelf,
  removeBooksFromBookshelf,
  updateBookshelf,
  deleteBookshelf,
  _getBookshelfIfDefault
};
