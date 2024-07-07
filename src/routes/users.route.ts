import { Router } from "express";
import usersController from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UpdateUserDto } from "../dtos";

const router = Router();

router.get("/", asyncWrapper(usersController.getAllUsers));

router.get("/:userId", asyncWrapper(usersController.getUserById));

router.get(
  "/:userId/readingChallenges",
  asyncWrapper(usersController.getReadingChallengesByUserId)
);

router.get(
  "/:userId/readingChallenges/:readingChallengeId",
  asyncWrapper(usersController.getReadingChallengeByUserId)
);

router.get(
  "/:userId/reviews",
  asyncWrapper(usersController.getReviewsByUserId)
);

router.get(
  "/:userId/reviews/:reviewId",
  asyncWrapper(usersController.getReviewByUserId)
);

router.get(
  "/:userId/bookshelves",
  asyncWrapper(usersController.getBookshelvesByUserId)
);

router.get(
  "/:userId/bookshelves/:userId",
  asyncWrapper(usersController.getBookshelfByUserId)
);

router.get("/:userId/books", asyncWrapper(usersController.getBooksByUserId));

router.patch(
  "/:userId",
  validationMiddleware(UpdateUserDto),
  asyncWrapper(usersController.updateUserById)
);

router.delete("/:userId", asyncWrapper(usersController.deleteUserById));

export default router;
