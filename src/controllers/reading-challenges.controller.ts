import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";

export const getAllReadingChallenges = async (req: Request, res: Response) => {
  const readingChallenges =
    await readingChallengesService.getAllReadingChallenges();

  return res.send(readingChallenges);
};

export const getReadingChallengeById = async (req: Request, res: Response) => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  const readingChallenges =
    await readingChallengesService.getReadingChallengeById(readingChallengeId);

  return res.send(readingChallenges);
};

export const getBooksByReadingChallengeId = async (
  req: Request,
  res: Response
) => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  const books =
    await readingChallengesService.getBooksByReadingChallengeId(
      readingChallengeId
    );

  return books;
};

export const addBookToReadingChallenge = async (
  req: Request,
  res: Response
) => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  const bookId = parseInt(req.params.bookId, 10);

  const updatedReadingChallenge =
    await readingChallengesService.addBookToReadingChallenge(
      readingChallengeId,
      bookId
    );

  return res.status(200).send(updatedReadingChallenge);
};

export const createReadingChallenge = async (req: Request, res: Response) => {
  const readingChallengeData = req.body;

  const createdReadingChallenge =
    await readingChallengesService.createReadingChallenge(readingChallengeData);

  return res.status(201).send(createdReadingChallenge);
};

export const updateReadingChallenge = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "Updating Reading Callenge Error : Missing Data" });
  }
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);

  const updatedData = req.body;
  const updatedReadingChallenge =
    await readingChallengesService.updateReadingChallenge(
      readingChallengeId,
      updatedData
    );

  if (!updatedReadingChallenge) {
    return res.status(404).send({ error: "Reading challenge not found" });
  }

  return res.status(200).send(updatedReadingChallenge);
};

export const deleteReadingChallenge = async (req: Request, res: Response) => {
  const readingChallengeId = parseInt(req.params.readingChallengeId, 10);
  if (!readingChallengeId) {
    return res.status(400).json({
      error: "Deleting Reading Callenge Error( Missing field: id ) ",
    });
  }
  const deletedReadingChallenge =
    await readingChallengesService.deleteReadingChallenge(readingChallengeId);

  return res.status(200).send(deletedReadingChallenge);
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getBooksByReadingChallengeId,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
