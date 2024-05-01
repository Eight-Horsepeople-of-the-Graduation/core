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
  id: number,
  updatedData: UpdateReadingChallengeDto
) => {
  const updatedReadingChallenge = await prismaClient.readingChallenge.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return updatedReadingChallenge;
};
export const deleteReadingChallenge = async (id: number) => {
  const deletedReadingChallenge = await prismaClient.readingChallenge.delete({
    where: {
      id: id,
    },
  });
  return deletedReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
