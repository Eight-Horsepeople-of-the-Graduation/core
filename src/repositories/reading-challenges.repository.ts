import { getEndDate, getTimeframe } from "@utils/dates-utils";
import {
  CreateReadingChallengeDto,
  Duration,
  UpdateReadingChallengeDto,
} from "../dtos";
import prismaClient from "../utils/prisma";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "../interfaces/reading-challenges.interface";
import { SelectReadingChallengeBook } from "../interfaces/books.interface";

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
  bookId: number
): Promise<IReadingChallenge[]> => {
  // Get all reading challenges that the user is currently participating in
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

  // Update progress for each reading challenge
  const updatedReadingChallenges: IReadingChallenge[] = await Promise.all(
    userReadingChallenges.map(async (readingChallenge) => {
      // Check if the reading challenge has already been completed (false positive)
      if (
        readingChallenge.progress >= readingChallenge.goal ||
        readingChallenge.endDate < new Date()
      ) {
        await prismaClient.readingChallenge.update({
          where: { id: readingChallenge.id },
          data: { hasEnded: true },
        });
        return readingChallenge;
      }

      // Check if the book is already in the reading challenge
      if (readingChallenge.books.some((book) => book.id === bookId))
        return readingChallenge;

      // Update the reading challenge by adding the book and incrementing the progress
      const updatedReadingChallenge =
        await prismaClient.readingChallenge.update({
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
  const updatedReadingChallenge: IReadingChallenge =
    await prismaClient.readingChallenge.update({
      where: {
        id: readingChallengeId,
      },
      data: updatedData,
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
  bookId: number
): Promise<IReadingChallengeWithBooks[]> => {
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
          readingChallenge.endDate < new Date()
        ) {
          await prismaClient.readingChallenge.update({
            where: { id: readingChallenge.id },
            data: { hasEnded: true },
          });
          return readingChallenge;
        }

        if (readingChallenge.books.some((book) => book.id === bookId)) {
          const updatedReadingChallenge =
            await prismaClient.readingChallenge.update({
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
        return readingChallenge;
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
