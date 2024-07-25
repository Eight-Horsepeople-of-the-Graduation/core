import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import { CreateReadingChallengeDto } from "@modules/reading-challenges/dtos/create-reading-challenge.dto";
import { UpdateReadingChallengeDto } from "@modules/reading-challenges/dtos/update-reading-challenge.dto";
import readingChallengesController from "@modules/reading-challenges/reading-challenges.controller";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  asyncWrapper(readingChallengesController.getAllReadingChallenges)
);

router.get(
  "/:readingChallengeId",
  authMiddleware,
  asyncWrapper(readingChallengesController.getReadingChallengeById)
);

router.get(
  "/:readingChallengeId/books",
  authMiddleware,
  asyncWrapper(readingChallengesController.getBooksByReadingChallengeId)
);

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.createReadingChallenge)
);

router.patch(
  "/:readingChallengeId",
  authMiddleware,
  [validationMiddleware(UpdateReadingChallengeDto)],
  asyncWrapper(readingChallengesController.updateReadingChallengeDetails)
);

router.patch(
  "/:userId/add-book/:bookId",
  authMiddleware,
  asyncWrapper(readingChallengesController.addBookToUserReadingChallenges)
);
router.patch(
  "/:userId/remove-book/:bookId",
  authMiddleware,
  asyncWrapper(readingChallengesController.deleteBookFromReadingChallenge)
);

router.delete(
  "/:readingChallengeId",
  authMiddleware,
  asyncWrapper(readingChallengesController.deleteReadingChallenge)
);

export default router;
