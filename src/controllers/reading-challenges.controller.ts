import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "../interfaces/reading-challenges.interface";
import { HttpException } from "@exceptions/http.exception";
import { HttpStatus } from "@enums/http-status.enum";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
} from "../interfaces/books.interface";

export const getAllReadingChallenges = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallengeWithBooks[]>> => {
  const readingChallenges =
    await readingChallengesService.getAllReadingChallenges();

  return res.send(readingChallenges);
};

export const getReadingChallengeById = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallengeWithBooks>> => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);
  if (!readingChallengeId) {
    throw new HttpException(
      "Missing required field: readingChallengeId",
      HttpStatus.BAD_REQUEST
    );
  }
  const readingChallenges =
    await readingChallengesService.getReadingChallengeById(readingChallengeId);

  return res.send(readingChallenges);
};

export const getBooksByReadingChallengeId = async (
  req: Request,
  res: Response
): Promise<Response<IBookWithoutAuthorsAndGenres[]>> => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);
  if (!readingChallengeId) {
    throw new HttpException(
      "Missing required field: readingChallengeId",
      HttpStatus.BAD_REQUEST
    );
  }

  const books =
    await readingChallengesService.getBooksByReadingChallengeId(
      readingChallengeId
    );

  return res.send(books);
};

export const addBookToUserReadingChallenges = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallenge[]>> => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);
  if (!readingChallengeId) {
    throw new HttpException(
      "Missing required field: readingChallengeId",
      HttpStatus.BAD_REQUEST
    );
  }

  const bookId = parseInt(req.params.bookId, 10);
  if (!bookId) {
    throw new HttpException(
      "Missing required field: bookId",
      HttpStatus.BAD_REQUEST
    );
  }

  const updatedReadingChallenges =
    await readingChallengesService.addBookToUserReadingChallenges(
      readingChallengeId,
      bookId
    );

  return res.send(updatedReadingChallenges);
};

export const createReadingChallenge = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallenge>> => {
  const readingChallengeData = req.body;

  const createdReadingChallenge =
    await readingChallengesService.createReadingChallenge(readingChallengeData);

  return res.status(HttpStatus.CREATED).send(createdReadingChallenge);
};

export const updateReadingChallengeDetails = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallenge>> => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);
  if (!readingChallengeId) {
    throw new HttpException(
      "Missing required field: readingChallengeId",
      HttpStatus.BAD_REQUEST
    );
  }

  const updatedData = req.body;
  const updatedReadingChallenge =
    await readingChallengesService.updateReadingChallengeDetails(
      readingChallengeId,
      updatedData
    );

  return res.send(updatedReadingChallenge);
};

export const deleteBookFromReadingChallenge = async (
  req: Request,
  res: Response
): Promise<Response<IReadingChallengeWithBooks>> => {
  const { readingChallengeId, bookId } = req.params;
  const readingChallengeIdInt = parseInt(readingChallengeId, 10);
  const bookIdInt = parseInt(bookId, 10);

  if (!bookIdInt) {
    throw new HttpException("Book ID is required", HttpStatus.BAD_GATEWAY);
  }

  if (!readingChallengeIdInt) {
    throw new HttpException(
      "Reading Challenge ID is required",
      HttpStatus.BAD_GATEWAY
    );
  }

  const updatedReadingChallenge =
    await readingChallengesService.deleteBookFromReadingChallenge(
      readingChallengeIdInt,
      bookIdInt
    );

  return res.send(updatedReadingChallenge);
};

export const deleteReadingChallenge = async (req: Request, res: Response) => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  if (!readingChallengeId) {
    throw new HttpException(
      "Reading Challenge ID is required",
      HttpStatus.BAD_GATEWAY
    );
  }
  
  const deletedReadingChallenge =
    await readingChallengesService.deleteReadingChallenge(readingChallengeId);

  return res.status(200).send(deletedReadingChallenge);
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getBooksByReadingChallengeId,
  addBookToUserReadingChallenges,
  createReadingChallenge,
  updateReadingChallengeDetails,
  deleteBookFromReadingChallenge,
  deleteReadingChallenge,
};
