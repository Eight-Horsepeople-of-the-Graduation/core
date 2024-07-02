import { Router } from "express";
import readingChallengesController from "../controllers/reading-challenges.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateReadingChallengeDto, UpdateReadingChallengeDto } from "../dtos";

const router = Router();

router.get(
  "/",
  asyncWrapper(readingChallengesController.getAllReadingChallenges)
);

router.get(
  "/:id",
  asyncWrapper(readingChallengesController.getReadingChallengeById)
);

router.get(
  "/user/:userId",
  asyncWrapper(readingChallengesController.getReadingChallengeByUserId)
);

router.post(
  "/",
  [validationMiddleware(CreateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.createReadingChallenge)
);

router.put(
  "/:id",
  [validationMiddleware(UpdateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.updateReadingChallenge)
);

router.put(
  "/add-book/:id",
  asyncWrapper(readingChallengesController.addBookToReadingChallenge)
);
router.put(
  "/remove-book/:id",
  asyncWrapper(readingChallengesController.deleteBookFromReadingChallenge)
);

router.delete(
  "/:id",
  asyncWrapper(readingChallengesController.deleteReadingChallenge)
);

export default router;
