import prismaClient from "../utils/prisma";
import { SelectReadingChallengeBook } from "../interfaces/books.interface";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "../interfaces/reading-challenges.interface";
import { Transaction } from "../types/prismaClient-transaction.type";
import { HttpException } from "../exceptions/http.exception";
import { HttpStatus } from "../enums/http-status.enum";
import {
  CreateReadingChallengeDto,
  Duration,
  UpdateReadingChallengeDto,
} from "../dtos";
import { getEndDate, getTimeframe } from "../utils/dates-utils";

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
): Promise<IReadingChallengeWithBooks | null> => {
  const readingChallenge: IReadingChallengeWithBooks | null =
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
        (readingChallenge.endDate && readingChallenge.endDate < new Date())
      ) {
        await _prismaClient.readingChallenge.update({
          where: { id: readingChallenge.id },
          data: { hasEnded: true },
        });
        throw new HttpException(
          "Reading challenge has already ended",
          HttpStatus.BAD_REQUEST
        );
      }

      // Check if the book is already in the reading challenge
      if (readingChallenge.books.some((book) => book.id === bookId))
        throw new HttpException(
          "Book was already added to the users currently active reading challenges",
          HttpStatus.BAD_REQUEST
        );

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
              (readingChallenge.endDate &&
                readingChallenge.endDate < new Date()) ||
              readingChallenge.progress + 1 >= readingChallenge.goal,
          },
          include: {
            books: {
              select: SelectReadingChallengeBook,
            },
          },
        });
      return updatedReadingChallenge;
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
  if (!readingChallenge) {
    throw new HttpException(
      "Reading challenge not found",
      HttpStatus.NOT_FOUND
    );
  }
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
        hasEnded: false,
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
        // Check if the reading challenge has already been completed (false positive)
        if (
          readingChallenge.progress >= readingChallenge.goal ||
          (readingChallenge.endDate && readingChallenge.endDate < new Date())
        ) {
          await _prismaClient.readingChallenge.update({
            where: { id: readingChallenge.id },
            data: { hasEnded: true },
          });
          throw new HttpException(
            "Reading challenge has already ended",
            HttpStatus.BAD_REQUEST
          );
        }

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
                  (readingChallenge.endDate &&
                    readingChallenge.endDate < new Date()) ||
                  readingChallenge.progress - 1 >= readingChallenge.goal,
              },
              include: {
                books: {
                  select: SelectReadingChallengeBook,
                },
              },
            });
          return updatedReadingChallenge;
        } else {
          throw new HttpException(
            "Book was not found in the users currently active reading challenges",
            HttpStatus.BAD_REQUEST
          );
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
