import reviewsController from "../controllers/reviews.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import asyncWrapper from "../utils/async-wrapper";
import { Router } from "express";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";

const router = Router();

router.get("/:id", asyncWrapper(reviewsController.getReviewById));

// should be in user route  /users/:id/reviews
router.get("/user/:id", asyncWrapper(reviewsController.getReviewsByUserId));

// should be in book route  /books/:id/reviews
router.get("/book/:id", asyncWrapper(reviewsController.getReviewsByBookId));

router.post(
  "/",
  [validationMiddleware(CreateReviewDto)],
  asyncWrapper(reviewsController.createReview)
);

router.patch(
  "/:id",
  [validationMiddleware(UpdateReviewDto)],
  asyncWrapper(reviewsController.updateReview)
);

router.delete("/:id", asyncWrapper(reviewsController.deleteReview));

export default router;
