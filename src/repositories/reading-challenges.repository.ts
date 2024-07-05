import { CreateReadingChallengeDto, UpdateReadingChallengeDto } from "../dtos";
import { prismaWrapper } from "@utils/prisma-wrapper";
import prismaClient from "../utils/prisma";

export const getAllReadingChallenges = async () => {
  const readingChallenges = await prismaWrapper(
    prismaClient.readingChallenge.findMany,
    {
      include: {
        books: true,
        _count: { select: { books: true } },
      },
    }
  );
  return readingChallenges;
};
export const getReadingChallengeById = async (id: number) => {
  const readingChallenge = await prismaWrapper(
    prismaClient.readingChallenge.findUnique,
    {
      where: {
        id: id,
      },
      include: {
        books: true,
        _count: { select: { books: true } },
      },
    }
  );
  return readingChallenge;
};

export const getReadingChallengesByUserId = async (userId: number) => {
  const readingChallenges = await prismaWrapper(
    prismaClient.readingChallenge.findMany,
    {
      where: {
        userId,
      },
      include: {
        books: true,
        _count: { select: { books: true } },
      },
    }
  );
  return readingChallenges;
};

export const addBookToReadingChallenge = async (
  readingChallengeId: number,
  bookId: number
) => {
  const updatedReadingChallenge = await prismaWrapper(
    prismaClient.readingChallenge.update,
    {
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
    }
  );
  return updatedReadingChallenge;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
) => {
  const createdReadingChallenge = await prismaWrapper(
    prismaClient.readingChallenge.create,
    {
      data: readingChallengeData,
    }
  );
  return createdReadingChallenge;
};

export const updateReadingChallenge = async (
  id: number,
  updatedData: UpdateReadingChallengeDto
) => {
  const updatedReadingChallenge = await prismaWrapper(
    prismaClient.readingChallenge.update,
    {
      where: {
        id,
      },
      data: updatedData,
    }
  );
  return updatedReadingChallenge;
};
export const deleteReadingChallenge = async (id: number) => {
  const deletedReadingChallenge = await prismaWrapper(
    prismaClient.readingChallenge.delete,
    {
      where: {
        id: id,
      },
    }
  );
  return deletedReadingChallenge;
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
