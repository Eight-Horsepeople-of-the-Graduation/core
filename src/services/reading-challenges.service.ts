import { getBookById } from "./books.service";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "../dtos/index";
import readingChallengesRepository from "../repositories/reading-challenges.repository";
import booksRepository from "@repositories/books.repository";

export const getAllReadingChallenges = async () => {
  if (!readingChallengesRepository) {
    throw new Error("Reading Challenges Repository not found");
  }
  const readingChallenges =
    await readingChallengesRepository.getAllReadingChallenges();

  return readingChallenges;
};

export const getReadingChallengeById = async (readingChallengeId: number) => {
  if (!readingChallengeId) {
    throw new Error("Missing required field: id");
  }
  const readingChallenge =
    await readingChallengesRepository.getReadingChallengeById(
      readingChallengeId
    );

  return readingChallenge;
};

export const getBooksByReadingChallengeId = async (
  readingChallengeId: number
) => {
  const books =
    await booksRepository.getBooksByReadingChallengeId(readingChallengeId);

  return books;
};

export const addBookToReadingChallenge = async (
  readingChallengeId: number,
  bookId: number
) => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  const readingChallenge = await getReadingChallengeById(readingChallengeId);
  if (!readingChallenge) {
    throw new Error("Reading Challenge not found");
  }
  const updatedReadingChallenge =
    await readingChallengesRepository.addBookToReadingChallenge(
      readingChallengeId,
      bookId
    );
  return updatedReadingChallenge;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
) => {
  const createdReadingChallenge =
    await readingChallengesRepository.createReadingChallenge(
      readingChallengeData
    );

  return createdReadingChallenge;
};

export const updateReadingChallenge = async (
  readingChallengeId: number,
  updatedData: UpdateReadingChallengeDto
) => {
  if (!readingChallengeId) {
    throw new Error("Missing required field: id");
  }

  const updatedReadingChallenge =
    await readingChallengesRepository.updateReadingChallenge(
      readingChallengeId,
      updatedData
    );

  return updatedReadingChallenge;
};

export const deleteBookFromReadingChallenge = async (
  readingChallengeId: number,
  bookId: number
) => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  const readingChallenge = await getReadingChallengeById(readingChallengeId);
  if (!readingChallenge) {
    throw new Error("Reading Challenge not found");
  }
  const updatedReadingChallenge =
    await readingChallengesRepository.deleteBookFromReadingChallenge(
      readingChallengeId,
      bookId
    );

  return updatedReadingChallenge;
};

export const deleteReadingChallenge = async (readingChallengeId: number) => {
  if (!readingChallengeId) {
    throw new Error("Missing required field: id");
  }
  const deletedReadingChallenge =
    await readingChallengesRepository.deleteReadingChallenge(
      readingChallengeId
    );

  return deletedReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getBooksByReadingChallengeId,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
