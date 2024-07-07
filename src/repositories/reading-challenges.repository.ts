import { CreateReadingChallengeDto, UpdateReadingChallengeDto } from "../dtos";
import prismaClient from "../utils/prisma";

export const getAllReadingChallenges = async () => {
  const readingChallenges = await prismaClient.readingChallenge.findMany({
    include: {
      books: true,
      _count: { select: { books: true } },
    },
  });
  return readingChallenges;
};
export const getReadingChallengeById = async (readingChallengeId: number) => {
  const readingChallenge = await prismaClient.readingChallenge.findUnique({
    where: {
      id: readingChallengeId,
    },
    include: {
      books: true,
      _count: { select: { books: true } },
    },
  });
  return readingChallenge;
};

export const getReadingChallengesByUserId = async (userId: number) => {
  const readingChallenges = await prismaClient.readingChallenge.findMany({
    where: {
      userId,
    },
    include: {
      books: true,
      _count: { select: { books: true } },
    },
  });
  return readingChallenges;
};

export const getReadingChallengeByUserId = async (
  userId: number,
  readingChallengeId: number
) => {
  const readingChallenge = await prismaClient.readingChallenge.findUnique({
    where: {
      id: readingChallengeId,
      user: {
        id: userId,
      },
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
  const updatedReadingChallenge = await prismaClient.readingChallenge.update({
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
  const createdReadingChallenge = await prismaClient.readingChallenge.create({
    data: readingChallengeData,
  });
  return createdReadingChallenge;
};

export const updateReadingChallenge = async (
  readingChallengeId: number,
  updatedData: UpdateReadingChallengeDto
) => {
  const updatedReadingChallenge = await prismaClient.readingChallenge.update({
    where: {
      id: readingChallengeId,
    },
    data: updatedData,
  });
  return updatedReadingChallenge;
};
export const deleteReadingChallenge = async (readingChallengeId: number) => {
  const deletedReadingChallenge = await prismaClient.readingChallenge.delete({
    where: {
      id: readingChallengeId,
    },
  });
  return deletedReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getReadingChallengesByUserId,
  getReadingChallengeByUserId,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
