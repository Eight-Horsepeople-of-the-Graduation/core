import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
} from "@common/interfaces/books.interface";
import { IBookshelf } from "@common/interfaces/bookshelves.interface";
import { IReadingChallengeWithBooks } from "@common/interfaces/reading-challenges.interface";
import { IReviewWithUserAndBook } from "@common/interfaces/reviews.interface";
import { IUserWithoutPassword } from "@common/interfaces/users.interface";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { UpdateUserDto } from "@modules/users/dtos/update-user.dto";
import usersService from "@modules/users/users.service";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { uniqBy } from "lodash";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const users = await usersService.getAllUsers(filter);

  return res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await usersService.getUserById(userId);

  return res.send(user);
};

export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const username = req.params.username;

  const user = await usersService.getUserByUsername(username);

  return res.send(user);
};

export const getReadingChallengesByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallengeWithBooks[]>> => {
  const userId = parseInt(req.params.userId, 10);
  if (!userId) {
    throw new HttpException(
      "Missing required field: userId",
      HttpStatus.BAD_REQUEST
    );
  }

  const readingChallenges =
    await usersService.getReadingChallengesByUserId(userId);

  return res.send(readingChallenges);
};

export const getReviewsByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook[]>> => {
  const { userId } = req.params;
  const reviews = await usersService.getReviewsByUserId(+userId);

  return res.send(reviews);
};

export const getReviewByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook>> => {
  const userId = parseInt(req.params.userId, 10);

  const reviewId = parseInt(req.params.reviewId, 10);

  const review = await usersService.getReviewByUserId(userId, reviewId);

  return res.send(review);
};

export const getBookshelvesByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf[]>> => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelves = await usersService.getBookshelvesByUserId(userId);

  return res.send(bookshelves);
};

export const getBookshelfByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IBookshelf>> => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const bookshelf = await usersService.getBookshelfByUserId(
    userId,
    bookshelfId
  );

  return res.send(bookshelf);
};

export const getBooksByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IBook[]>> => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelves = await usersService.getBookshelvesByUserId(userId);

  const books = bookshelves.flatMap(
    (bookshelf: { books: IBookWithoutAuthorsAndGenres[] }) => bookshelf.books
  );

  const distinctBooks = uniqBy(books, "id");

  return res.send(distinctBooks);
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);
  const updatedData: UpdateUserDto = req.body;

  const user = await usersService.updateUserById(userId, updatedData);

  return res.send(user);
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await usersService.deleteUserById(userId);

  return res.send(user);
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getReadingChallengesByUserId,
  getReviewsByUserId,
  getReviewByUserId,
  getBookshelvesByUserId,
  getBookshelfByUserId,
  getBooksByUserId,
  updateUserById,
  deleteUserById,
};
