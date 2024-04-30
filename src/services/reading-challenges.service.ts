import { getBookById } from "./books.service";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "../dtos/index";
import readingChallengesRepository from "../repositories/reading-Challenges.repository";

export const getAllReadingChallenges = async () => {
  const readingChallenges =
    await readingChallengesRepository.getAllReadingChallenges();

  return readingChallenges;
};

export const getReadingChallengeById = async (id: number) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }
  const readingChallenge =
    await readingChallengesRepository.getReadingChallengeById(id);

  return readingChallenge;
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
  id: number,
  updatedData: UpdateReadingChallengeDto
) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }

  const updatedReadingChallenge =
    await readingChallengesRepository.updateReadingChallenge(id, updatedData);

  return updatedReadingChallenge;
};

export const deleteReadingChallenge = async (id: number) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }
  const deletedReadingChallenge =
    await readingChallengesRepository.deleteReadingChallenge(id);

  return deletedReadingChallenge;
};
