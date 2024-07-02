import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";

export const getAllReadingChallenges = async (req: Request, res: Response) => {
  const readingChallenges =
    await readingChallengesService.getAllReadingChallenges();

  return res.send(readingChallenges);
};

export const getReadingChallengeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const readingChallenges =
    await readingChallengesService.getReadingChallengeById(+id);

  if (!readingChallenges) {
    return res.send({ error: "Reading challenges not found" });
  }

  return res.send(readingChallenges);
};

export const getReadingChallengeByUserId = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const readingChallenge =
    await readingChallengesService.getReadingChallengesByUserId(+userId);
  if (!readingChallenge) {
    return res
      .status(404)
      .send({ error: "No Reading Challenge For This User" });
  }

  return res.send(readingChallenge);
};

export const addBookToReadingChallenge = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).send({ error: "Book ID is required" });
  }
  const updatedReadingChallenge =
    await readingChallengesService.addBookToReadingChallenge(+id, bookId);

  return res.status(200).send(updatedReadingChallenge);
};

export const createReadingChallenge = async (req: Request, res: Response) => {
  const readingChallengeData = req.body;

  if (!req.body) {
    return res.status(400).send({ error: "Missing required fields" });
  }
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
  if (!req.params.id) {
    return res
      .status(400)
      .json({ error: "Updating Reading Callenge Error : Missing Id" });
  }
  const { id } = req.params;
  const updatedData = req.body;
  const updatedReadingChallenge =
    await readingChallengesService.updateReadingChallenge(+id, updatedData);

  if (!updatedReadingChallenge) {
    return res.status(404).send({ error: "Reading challenge not found" });
  }

  return res.status(200).send(updatedReadingChallenge);
};

export const deleteReadingChallenge = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Deleting Reading Callenge Error( Missing field: id ) ",
    });
  }
  const deletedReadingChallenge =
    await readingChallengesService.deleteReadingChallenge(+id);

  return res.status(200).send(deletedReadingChallenge);
};

export default {
  getAllReadingChallenges,
  getReadingChallengeById,
  getReadingChallengeByUserId,
  addBookToReadingChallenge,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
};
