import { Router } from "express";
import {
  getAllReadingChallenges,
  createReadingChallenge,
} from "../controllers/reading-challenges.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(getAllReadingChallenges));
router.post("/", asyncWrapper(createReadingChallenge));

export default router;
