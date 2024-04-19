import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";

export const listReadingChallenges = async (req: Request, res: Response) => {
  const readingChallenges =
    await readingChallengesService.getReadingChallenges();

  return res.send(readingChallenges);
};

export const createReadingChallenge = async (req: Request, res: Response) => {
  const readingChallengeData = req.body;
  const readingChallenge =
    await readingChallengesService.createReadingChallenge(readingChallengeData);

  return res.status(201).send(readingChallenge);
};
