import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import readingChallengesRepository from "@repositories/reading-challenges.repository";
import reviewsRepository from "@repositories/reviews.repository";
import bookshelvesRepository from "@repositories/bookshelves.repository";
import booksRepository from "@repositories/books.repository";
import prismaClient from "@utils/prisma";
import { IUserWithoutPassword } from "../interfaces/users.interface";
import { IBookshelf } from "../interfaces/bookshelves.interface";
import { IReviewWithUserAndBook } from "../interfaces/reviews.interface";
import { IBook } from "../interfaces/books.interface";
import { IReadingChallengeWithBooks } from "../interfaces/reading-challenges.interface";

export const getAllUsers = async (
  filter: SearchQueryDto
): Promise<IUserWithoutPassword[]> => {
  const users = await usersRepository.getAllUsers(filter);

  return users;
};

export const getUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.getUserById(userId);

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.getUserByUsername(username);

  return user;
};

export const getBooksByUserId = async (userId: number): Promise<IBook[]> => {
  const books = await booksRepository.getBooksByUserId(userId);

  return books;
};
export const getReadingChallengesByUserId = async (userId: number) => {
  const readingChallenges =
    await readingChallengesRepository.getReadingChallengesByUserId(userId);

  return readingChallenges;
};

export const getReadingChallengeByUserId = async (
  userId: number
): Promise<IReadingChallengeWithBooks[]> => {
  const readingChallenge =
    await readingChallengesRepository.getReadingChallengesByUserId(userId);

  return readingChallenge;
};

export const getReviewsByUserId = async (
  userId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews = await reviewsRepository.getReviewsByUserId(userId);

  return reviews;
};

export const getBookshelvesByUserId = async (
  userId: number
): Promise<IBookshelf[]> => {
  const bookshelves: IBookshelf[] =
    await bookshelvesRepository.getBookshelvesByUserId(userId);

  return bookshelves;
};

export const getBookshelfByUserId = async (
  userId: number,
  bookshelfId: number
): Promise<IBookshelf> => {
  const bookshelf = await bookshelvesRepository.getBookshelfByUserId(
    userId,
    bookshelfId
  );
  return bookshelf;
};

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<IUserWithoutPassword> => {
  const newUser = await usersRepository.createUser(createUserDto);

  return newUser;
};

export const updateUserById = async (
  userId: number,
  updatedData: UpdateUserDto
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.updateUserById(userId, updatedData);

  return user;
};

export const deleteUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.deleteUserById(userId);

  return user;
};

export const getReviewByUserId = async (
  userId: number,
  reviewId: number
): Promise<IReviewWithUserAndBook> => {
  const review = await reviewsRepository.getReviewByUserId(userId, reviewId);

  return review;
};

export const validateCredentials = async (
  email: string,
  password: string
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.validateCredentials(email, password);

  return user;
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getReadingChallengesByUserId,
  getReadingChallengeByUserId,
  getReviewsByUserId,
  getReviewByUserId,
  getBookshelvesByUserId,
  getBookshelfByUserId,
  createUser,
  updateUserById,
  deleteUserById,
  validateCredentials,
};
