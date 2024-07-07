import { Request, Response } from "express";
import usersService from "../services/users.service";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { plainToInstance } from "class-transformer";
import { uniqBy } from "lodash";

export const getAllUsers = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const users = await usersService.getAllUsers(filter);

  return res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  const user = await usersService.getUserById(userId);

  return res.send(user);
};

export const getReadingChallengesByUserId = async (
  req: Request,
  res: Response
) => {
  const userId = parseInt(req.params.id, 10);

  const readingChallenges =
    await usersService.getReadingChallengesByUserId(userId);

  return res.send(readingChallenges);
};

export const getReadingChallengeByUserId = async (
  req: Request,
  res: Response
) => {
  const userId = parseInt(req.params.userId, 10);

  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  const readingChallenge = await usersService.getReadingChallengeByUserId(
    userId,
    readingChallengeId
  );

  return res.send(readingChallenge);
};

export const getReviewsByUserId = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.reviewId, 10);

  const reviews = await usersService.getReviewsByUserId(reviewId);

  return res.send(reviews);
};

export const getReviewByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  const reviewId = parseInt(req.params.reviewId, 10);

  const review = await usersService.getReviewByUserId(userId, reviewId);

  return res.send(review);
};

export const getBookshelvesByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelves = await usersService.getBookshelvesByUserId(userId);

  return res.send(bookshelves);
};

export const getBookshelfByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelfId = parseInt(req.params.bookshelfId, 10);

  const bookshelf = await usersService.getBookshelfByUserId(
    userId,
    bookshelfId
  );

  return res.send(bookshelf);
};

export const getBooksByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  const bookshelves = await usersService.getBookshelvesByUserId(userId);

  const books = bookshelves.flatMap(
    (bookshelf: { books: any }) => bookshelf.books
  );

  const distinctBooks = uniqBy(books, "id");

  return res.send(distinctBooks);
};

export const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserDto = req.body;

  const user = await usersService.createUser(userData);

  return res.status(201).send(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedData: UpdateUserDto = req.body;

  const user = await usersService.updateUserById(id, updatedData);

  return res.send(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const user = await usersService.deleteUserById(id);

  return res.send(user);
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
  getBooksByUserId,
  createUser,
  updateUserById,
  deleteUserById,
};
