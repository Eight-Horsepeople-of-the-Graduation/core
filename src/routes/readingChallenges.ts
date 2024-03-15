import express, { Router } from "express";
import {
  listReadingChallenges,
  createReadingChallenge,
} from "../controllers/readingChallengesController";
import asyncWrapper from "../utils/asyncWrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listReadingChallenges));
router.post("/", asyncWrapper(createReadingChallenge));

export default router;
