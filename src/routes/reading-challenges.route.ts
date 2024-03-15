import express, { Router } from "express";
import {
  listReadingChallenges,
  createReadingChallenge,
} from "../controllers/reading-challenges.controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listReadingChallenges));
router.post("/", asyncWrapper(createReadingChallenge));

export default router;
