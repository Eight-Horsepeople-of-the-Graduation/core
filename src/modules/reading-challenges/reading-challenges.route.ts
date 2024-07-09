import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "@modules/reading-challenges/dtos/reading-challenges.dto";
import readingChallengesController from "@modules/reading-challenges/reading-challenges.controller";
import { Router } from "express";

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
  "/:userId/add-book/:bookId",
  asyncWrapper(readingChallengesController.addBookToUserReadingChallenges)
);
router.patch(
  "/:userId/remove-book/:bookId",
  asyncWrapper(readingChallengesController.deleteBookFromReadingChallenge)
);

router.delete(
  "/:readingChallengeId",
  asyncWrapper(readingChallengesController.deleteReadingChallenge)
);

export default router;
