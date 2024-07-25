import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import { UpdateUserDto } from "@modules/users/dtos/update-user.dto";
import usersController from "@modules/users/users.controller";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(usersController.getAllUsers));

router.get("/id/:userId", asyncWrapper(usersController.getUserById));
router.get(
  "/username/:username",
  asyncWrapper(usersController.getUserByUsername)
);

router.get(
  "/:userId/readingChallenges",
  asyncWrapper(usersController.getReadingChallengesByUserId)
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
  "/:userId/bookshelves/:bookshelfId",
  asyncWrapper(usersController.getBookshelfByUserId)
);

router.get("/:userId/books", asyncWrapper(usersController.getBooksByUserId));

router.patch(
  "/:userId",
  authMiddleware,
  validationMiddleware(UpdateUserDto),
  asyncWrapper(usersController.updateUserById)
);

router.delete(
  "/:userId",
  authMiddleware,
  asyncWrapper(usersController.deleteUserById)
);

export default router;
