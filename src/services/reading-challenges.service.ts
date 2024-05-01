import { getBookById } from "./books.service";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "../dtos/index";
import prisma from "../utils/prisma";

export const getAllReadingChallenges = async () => {
  const readingChallenges = await prisma.readingChallenge.findMany({
    include: {
      books: true,
      _count: { select: { books: true } },
    },
  });

  return readingChallenges;
};

export const getReadingChallengeById = async (id: number) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }

  const readingChallenge = await prisma.readingChallenge.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
      _count: { select: { books: true } },
    },
  });

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
  const updatedReadingChallenge = await prisma.readingChallenge.update({
    where: {
      id: readingChallengeId,
    },
    data: {
      books: {
        connect: {
          id: bookId,
        },
      },
    },
    include: {
      books: true,
    },
  });
  return updatedReadingChallenge;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
) => {
  const { title, type, userId, progress } = readingChallengeData;

  const createdReadingChallenge = await prisma.readingChallenge.create({
    data: {
      title,
      type,
      userId,
      progress,
    },
  });
  return createdReadingChallenge;
};

export const updateReadingChallenge = async (
  id: number,
  updatedDataDto: UpdateReadingChallengeDto
) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }

  const updatedReadingChallenge = await prisma.readingChallenge.update({
    where: {
      id,
    },
    data: updatedDataDto,
  });

  return updatedReadingChallenge;
};

export const deleteReadingChallenge = async (id: number) => {
  if (!id) {
    throw new Error("Missing required field: id");
  }

  const deletedReadingChallenge = await prisma.readingChallenge.delete({
    where: {
      id,
    },
  });

  return deletedReadingChallenge;
};
