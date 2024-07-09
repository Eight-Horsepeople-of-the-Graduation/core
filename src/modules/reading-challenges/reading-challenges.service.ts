import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
} from "@common/interfaces/books.interface";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "@common/interfaces/reading-challenges.interface";
import { IUserWithoutPassword } from "@common/interfaces/users.interface";
import booksRepository, { getBookById } from "@modules/books/books.repository";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "@modules/reading-challenges/dtos/reading-challenges.dto";
import readingChallengesRepository from "@modules/reading-challenges/reading-challenges.repository";
import { getUserById } from "@modules/users/users.service";

export const getAllReadingChallenges = async (): Promise<
  IReadingChallengeWithBooks[]
> => {
  if (!readingChallengesRepository) {
    throw new HttpException(
      "INTERNAL_SERVER_ERROR: Reading Challenges Repository not found",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  const readingChallenges: IReadingChallengeWithBooks[] =
    await readingChallengesRepository.getAllReadingChallenges();

  return readingChallenges;
};

export const getReadingChallengeById = async (
  readingChallengeId: number
): Promise<IReadingChallengeWithBooks> => {
  const readingChallenge: IReadingChallengeWithBooks =
    await readingChallengesRepository.getReadingChallengeById(
      readingChallengeId
    );

  return readingChallenge;
};

export const getBooksByReadingChallengeId = async (
  readingChallengeId: number
): Promise<IBookWithoutAuthorsAndGenres[]> => {
  const books: IBookWithoutAuthorsAndGenres[] =
    await booksRepository.getBooksByReadingChallengeId(readingChallengeId);

  return books;
};

export const addBookToUserReadingChallenges = async (
  userId: number,
  bookId: number
) => {
  const user: IUserWithoutPassword = await getUserById(userId);
  if (!user) {
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
  const book: IBook = await getBookById(bookId);
  if (!book) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }

  const updatedReadingChallenges: IReadingChallenge[] =
    await readingChallengesRepository.addBookToUserReadingChallenges(
      userId,
      bookId
    );
  return updatedReadingChallenges;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
): Promise<IReadingChallenge> => {
  const { type, userId } = readingChallengeData;
  const ActiveReadingChallenge =
    await readingChallengesRepository.getActiveReadingChallengeByType(
      type,
      userId
    );
  if (ActiveReadingChallenge) {
    throw new HttpException(
      "User already has an active reading challenge of this type",
      HttpStatus.BAD_REQUEST
    );
  }

  const createdReadingChallenge: IReadingChallenge =
    await readingChallengesRepository.createReadingChallenge(
      readingChallengeData
    );

  return createdReadingChallenge;
};

export const updateReadingChallengeDetails = async (
  readingChallengeId: number,
  updatedData: UpdateReadingChallengeDto
): Promise<IReadingChallenge> => {
  const updatedReadingChallenge: IReadingChallenge =
    await readingChallengesRepository.updateReadingChallengeDetails(
      readingChallengeId,
      updatedData
    );

  return updatedReadingChallenge;
};

export const deleteBookFromUserReadingChallenges = async (
  userId: number,
  bookId: number
): Promise<IReadingChallengeWithBooks[]> => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
  }
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
  const updatedReadingChallenges: IReadingChallengeWithBooks[] =
    await readingChallengesRepository.deleteBookFromUserReadingChallenges(
      userId,
      bookId
    );

  return updatedReadingChallenges;
};

export const deleteReadingChallenge = async (
  readingChallengeId: number
): Promise<IReadingChallenge> => {
  const deletedReadingChallenge: IReadingChallenge =
    await readingChallengesRepository.deleteReadingChallenge(
      readingChallengeId
    );

  return deletedReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getBooksByReadingChallengeId,
  addBookToUserReadingChallenges,
  createReadingChallenge,
  updateReadingChallengeDetails,
  deleteReadingChallenge,
  deleteBookFromUserReadingChallenges,
};
