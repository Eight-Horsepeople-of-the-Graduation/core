import express, { Router } from "express";
import {
  listReadingChallenges,
  createReadingChallenge,
} from "../controllers/readingChallengesController";

const router: Router = express.Router();

router.get("/", listReadingChallenges);
router.post("/", createReadingChallenge);

export default router;
