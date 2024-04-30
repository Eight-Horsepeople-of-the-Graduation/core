import { Router } from "express";
import {
  getAllReadingChallenges,
  createReadingChallenge,
  updateReadingChallenge,
  deleteReadingChallenge,
  getReadingChallengeById,
  addBookToReadingChallenge,
} from "../controllers/reading-challenges.controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = Router();

router.get("/", asyncWrapper(getAllReadingChallenges));
router.get("/:id", asyncWrapper(getReadingChallengeById));
router.post("/", asyncWrapper(createReadingChallenge));
router.put("/:id", asyncWrapper(updateReadingChallenge));
router.put("/add-book/:id", asyncWrapper(addBookToReadingChallenge));
router.delete("/:id", asyncWrapper(deleteReadingChallenge));

export default router;
