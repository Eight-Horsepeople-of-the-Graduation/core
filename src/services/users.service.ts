import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import readingChallengesRepository from "@repositories/reading-challenges.repository";
import reviewsRepository from "@repositories/reviews.repository";
import bookshelvesRepository from "@repositories/bookshelves.repository";
import booksRepository from "@repositories/books.repository";
import prismaClient from "@utils/prisma";

export const getAllUsers = async (filter: SearchQueryDto) => {
  const users = await usersRepository.getAllUsers(filter);

  return users;
};

export const getUserById = async (userId: number) => {
  const user = await usersRepository.getUserById(userId);

  return user;
};

export const getReadingChallengesByUserId = async (userId: number) => {
  const readingChallenges =
    await readingChallengesRepository.getReadingChallengesByUserId(userId);

  return readingChallenges;
};

export const getReadingChallengeByUserId = async (
  userId: number,
  reviewId: number
) => {
  const readingChallenge =
    await readingChallengesRepository.getReadingChallengeByUserId(
      userId,
      reviewId
    );

  return readingChallenge;
};

export const getReviewsByUserId = async (userId: number) => {
  const reviews = await reviewsRepository.getReviewsByUserId(userId);

  return reviews;
};

export const getReviewByUserId = async (userId: number, reviewId: number) => {
  const review = await reviewsRepository.getReviewByUserId(userId, reviewId);

  return review;
};

export const getBookshelvesByUserId = async (userId: number) => {
  const bookshelves =
    await bookshelvesRepository.getBookshelvesByUserId(userId);

  return bookshelves;
};

export const getBookshelfByUserId = async (
  userId: number,
  bookshelfId: number
) => {
  const bookshelf = await bookshelvesRepository.getBookshelfByUserId(
    userId,
    bookshelfId
  );
};

export const createUser = async (userData: CreateUserDto) => {
  const user = await usersRepository.createUser(userData);

  return user;
};

export const updateUserById = async (
  userId: number,
  updatedData: UpdateUserDto
) => {
  const user = await usersRepository.updateUserById(userId, updatedData);

  return user;
};

export const deleteUserById = async (userId: number) => {
  const user = await usersRepository.deleteUserById(userId);

  return user;
};

export default {
  getAllUsers,
  getUserById,
  getReadingChallengesByUserId,
  getReadingChallengeByUserId,
  getReviewsByUserId,
  getReviewByUserId,
  getBookshelvesByUserId,
  getBookshelfByUserId,
  createUser,
  updateUserById,
  deleteUserById,
};
