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
  "/:readingChallengeId",
  asyncWrapper(readingChallengesController.getReadingChallengeById)
);

router.get(
  "/:readingChallengeId/books",
  asyncWrapper(readingChallengesController.getBooksByReadingChallengeId)
);

router.post(
  "/",
  [validationMiddleware(CreateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.createReadingChallenge)
);

router.patch(
  "/:readingChallengeId",
  [validationMiddleware(UpdateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.updateReadingChallengeDetails)
);

router.patch(
  "/:readingChallengeId/add-book/:bookId",
  asyncWrapper(readingChallengesController.addBookToUserReadingChallenges)
);
router.patch(
  "/:readingChallengeId/remove-book/:bookId",
  asyncWrapper(readingChallengesController.deleteBookFromReadingChallenge)
);

router.delete(
  "/:readingChallengeId",
  asyncWrapper(readingChallengesController.deleteReadingChallenge)
);

export default router;
