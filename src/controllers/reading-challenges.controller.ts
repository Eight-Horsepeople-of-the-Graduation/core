import { Request, Response } from "express";
import * as readingChallengesService from "../services/reading-challenges.service";

export const listReadingChallenges = async (req: Request, res: Response) => {
  try {
    const readingChallenges =
      await readingChallengesService.getReadingChallenges();

    return res.send(readingChallenges);
  } catch (error) {
    console.error("Error listing reading challenges:", error);

    return res.status(500).send("Internal Server Error");
  }
};

export const createReadingChallenge = async (req: Request, res: Response) => {
  try {
    const readingChallengeData = req.body;
    const readingChallenge =
      await readingChallengesService.createReadingChallenge(
        readingChallengeData
      );

    return res.status(201).send(readingChallenge);
  } catch (error) {
    console.error("Error creating reading challenge:", error);

    return res.status(500).send("Internal Server Error");
  }
};
