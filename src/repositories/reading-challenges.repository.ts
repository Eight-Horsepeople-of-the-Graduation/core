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

export const getReadingChallengeById = async (id: number) => {
  const readingChallenge = await prismaClient.readingChallenge.findUnique({
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

export const addBookToReadingChallenge = async (
  readingChallengeId: number,
  bookId: number
) => {
  const updateReadingChallenge = await prismaClient.readingChallenge.update({
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

  return updateReadingChallenge;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
) => {
  const createReadingChallenge = await prismaClient.readingChallenge.create({
    data: readingChallengeData,
  });

  return createReadingChallenge;
};

export const updateReadingChallenge = async (
  id: number,
  updatedData: UpdateReadingChallengeDto
) => {
  const updateReadingChallenge = await prismaClient.readingChallenge.update({
    where: {
      id,
    },
    data: updatedData,
  });

  return updateReadingChallenge;
};

export const deleteReadingChallenge = async (id: number) => {
  const deleteReadingChallenge = await prismaClient.readingChallenge.delete({
    where: {
      id: id,
    },
  });

  return deleteReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getReadingChallengesByUserId,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
