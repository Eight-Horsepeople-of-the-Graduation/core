import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";

export const getAllReadingChallenges = async (req: Request, res: Response) => {
  try {
    const readingChallenges =
      await readingChallengesService.getAllReadingChallenges();
    return res.send(readingChallenges);
  } catch (error) {
    console.error("Error listing reading challenges:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getReadingChallengeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const readingChallenge =
    await readingChallengesService.getReadingChallengeById(+id);

  if (!readingChallenge) {
    return res.status(404).send({ error: "Reading challenge not found" });
  }

  return res.send(readingChallenge);
};

export const addBookToReadingChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { bookId } = req.body;

    const updatedReadingChallenge =
      await readingChallengesService.addBookToReadingChallenge(+id, bookId);

    return res.status(200).send(updatedReadingChallenge);
  } catch (error) {
    console.error("Error adding book to reading challenge:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createReadingChallenge = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Creating Reading Challenge Error: Missing Data" });
    }
    const readingChallengeData = req.body;
    const createdReadingChallenge =
      await readingChallengesService.createReadingChallenge(
        readingChallengeData
      );

    return res.status(201).send(createdReadingChallenge);
  } catch (error) {
    console.error("Error creating reading challenge:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateReadingChallenge = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Updating Reading Callenge Error : Missing Data" });
    }
    const { id } = req.params;
    const updatedData = req.body;
    const updatedReadingChallenge =
      await readingChallengesService.updateReadingChallenge(+id, updatedData);

    if (!updatedReadingChallenge) {
      return res.status(404).send({ error: "Reading challenge not found" });
    }

    return res.status(200).send(updatedReadingChallenge);
  } catch (error) {
    console.error("Error updating reading challenge:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteReadingChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "Deleting Reading Callenge Error( Missing field: id ) ",
      });
    }
    const deletedReadingChallenge =
      await readingChallengesService.deleteReadingChallenge(+id);

    return res.status(200).send(deletedReadingChallenge);
  } catch (error) {
    console.error("Error deleting reading challenge:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
