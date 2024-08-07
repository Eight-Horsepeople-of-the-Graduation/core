import { getEndDate, getTimeframe } from "../../common/utils/dates-utils";
import { CreateReadingChallengeDto } from "./dtos/create-reading-challenge.dto";
import prismaClient from "../../common/utils/prisma";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "../../common/interfaces/reading-challenges.interface";
import { SelectReadingChallengeBook } from "../../common/interfaces/books.interface";
import { HttpException } from "../../common/exceptions/http.exception";
import { HttpStatus } from "../../common/enums/http-status.enum";
import { Transaction } from "@common/types/prismaClient-transaction.type";
import { UpdateReadingChallengeDto } from "@modules/reading-challenges/dtos/update-reading-challenge.dto";
import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";

export const getAllReadingChallenges = async (): Promise<
  IReadingChallengeWithBooks[]
> => {
  const readingChallenges: IReadingChallengeWithBooks[] =
    await prismaClient.readingChallenge.findMany({
      include: {
        books: {
          select: SelectReadingChallengeBook,
        },
      },
    });
  return readingChallenges;
};

export const getReadingChallengeById = async (
  readingChallengeId: number
): Promise<IReadingChallengeWithBooks> => {
  const readingChallenge: IReadingChallengeWithBooks =
    await prismaClient.readingChallenge.findUnique({
      where: {
        id: readingChallengeId,
      },
      include: {
        books: {
          select: SelectReadingChallengeBook,
        },
      },
    });
  return readingChallenge;
};

export const getReadingChallengesByUserId = async (
  userId: number
): Promise<IReadingChallengeWithBooks[]> => {
  const readingChallenges: IReadingChallengeWithBooks[] =
    await prismaClient.readingChallenge.findMany({
      where: {
        userId,
      },
      include: {
        books: {
          select: SelectReadingChallengeBook,
        },
      },
    });
  return readingChallenges;
};

export const addBookToUserReadingChallenges = async (
  userId: number,
  bookId: number,
  tx?: Transaction
): Promise<IReadingChallenge[]> => {
  const _prismaClient = tx || prismaClient;
  // Get all reading challenges that the user is currently participating in
  const userReadingChallenges: IReadingChallengeWithBooks[] =
    await _prismaClient.readingChallenge.findMany({
      where: {
        userId,
        hasEnded: false,
      },
      include: {
        books: {
          select: SelectReadingChallengeBook,
        },
      },
    });

  // Update progress for each reading challenge
  const updatedReadingChallenges: IReadingChallenge[] = await Promise.all(
    userReadingChallenges.map(async (readingChallenge) => {
      // Check if the reading challenge has already been completed (false positive)
      if (
        readingChallenge.progress >= readingChallenge.goal ||
        readingChallenge.endDate < new Date()
      ) {
        const endedReadingChallenge =
          await _prismaClient.readingChallenge.update({
            where: { id: readingChallenge.id },
            data: { hasEnded: true },
          });

        return endedReadingChallenge;
      }

      // Check if the book is already in the reading challenge
      if (!readingChallenge.books.some((book) => book.id === bookId)) {
        // Update the reading challenge by adding the book and incrementing the progress
        const updatedReadingChallenge =
          await _prismaClient.readingChallenge.update({
            where: {
              id: readingChallenge.id,
            },
            data: {
              books: {
                connect: {
                  id: bookId,
                },
              },
              progress: {
                increment: 1,
              },
              hasEnded:
                readingChallenge.endDate < new Date() ||
                readingChallenge.progress + 1 >= readingChallenge.goal,
            },
            include: {
              books: {
                select: SelectReadingChallengeBook,
              },
            },
          });
        return updatedReadingChallenge;
      }
      return readingChallenge;
    })
  );

  return updatedReadingChallenges;
};

export const createReadingChallenge = async (
  readingChallengeData: CreateReadingChallengeDto
): Promise<IReadingChallenge> => {
  const { goal, title, type, userId } = readingChallengeData;

  const createdReadingChallenge: IReadingChallenge =
    await prismaClient.readingChallenge.create({
      data: {
        title: title || null,
        type,
        goal,
        userId,
        endDate: getEndDate(new Date(), type),
        timeframe: getTimeframe(new Date(), type),
      },
    });

  return createdReadingChallenge;
};

export const updateReadingChallengeDetails = async (
  readingChallengeId: number,
  updatedData: UpdateReadingChallengeDto
): Promise<IReadingChallenge> => {
  const readingChallenge = await prismaClient.readingChallenge.findUnique({
    where: {
      id: readingChallengeId,
    },
  });

  const updatedReadingChallenge: IReadingChallenge =
    await prismaClient.readingChallenge.update({
      where: {
        id: readingChallengeId,
      },
      data: {
        ...updatedData,
        hasEnded: updatedData.goal
          ? readingChallenge.progress >= updatedData.goal
          : readingChallenge.hasEnded,
      },
    });
  return updatedReadingChallenge;
};
export const deleteReadingChallenge = async (
  readingChallengeId: number
): Promise<IReadingChallenge> => {
  const deletedReadingChallenge: IReadingChallenge =
    await prismaClient.readingChallenge.delete({
      where: {
        id: readingChallengeId,
      },
    });
  return deletedReadingChallenge;
};

export const deleteBookFromUserReadingChallenges = async (
  userId: number,
  bookId: number,
  tx?: Transaction
): Promise<IReadingChallengeWithBooks[]> => {
  const _prismaClient = tx || prismaClient;

  const userReadingChallenges: IReadingChallengeWithBooks[] =
    await prismaClient.readingChallenge.findMany({
      where: {
        userId,
      },
      include: {
        books: {
          select: SelectReadingChallengeBook,
        },
      },
    });

  const updatedReadingChallenges: IReadingChallengeWithBooks[] =
    await Promise.all(
      userReadingChallenges.map(async (readingChallenge) => {
        if (readingChallenge.books.some((book) => book.id === bookId)) {
          const updatedReadingChallenge =
            await _prismaClient.readingChallenge.update({
              where: {
                id: readingChallenge.id,
              },
              data: {
                progress: {
                  decrement: 1,
                },
                books: {
                  disconnect: {
                    id: bookId,
                  },
                },
                hasEnded:
                  readingChallenge.endDate < new Date() ||
                  readingChallenge.progress - 1 >= readingChallenge.goal,
              },
              include: {
                books: {
                  select: SelectReadingChallengeBook,
                },
              },
            });
          return updatedReadingChallenge;
        }
      })
    );

  return updatedReadingChallenges;
};

const getActiveReadingChallengeByType = async (
  type: Duration,
  userId: number
) => {
  const activeReadingChallenge = await prismaClient.readingChallenge.findFirst({
    where: {
      userId,
      type,
      hasEnded: false,
    },
  });
  return activeReadingChallenge;
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getReadingChallengesByUserId,
  addBookToUserReadingChallenges,
  createReadingChallenge,
  deleteBookFromUserReadingChallenges,
  updateReadingChallengeDetails,
  deleteReadingChallenge,
  getActiveReadingChallengeByType,
};
