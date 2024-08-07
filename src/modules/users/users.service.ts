import { IBook } from "@common/interfaces/books.interface";
import { IBookshelf } from "@common/interfaces/bookshelves.interface";
import { IReadingChallengeWithBooks } from "@common/interfaces/reading-challenges.interface";
import { IReviewWithUserAndBook } from "@common/interfaces/reviews.interface";
import { IUserWithoutPassword } from "@common/interfaces/users.interface";
import booksRepository from "../../modules/books/books.repository";
import bookshelvesRepository from "../../modules/bookshelves/bookshelves.repository";
import readingChallengesRepository from "../../modules/reading-challenges/reading-challenges.repository";
import reviewsRepository from "../../modules/reviews/reviews.repository";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { CreateUserDto } from "@modules/users/dtos/create-user.dto";
import { UpdateUserDto } from "@modules/users/dtos/update-user.dto";
import usersRepository from "../../modules/users/users.repository";

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
