import { authMiddleware } from "@common/middleware/auth.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import { CreateReviewDto } from "@modules/reviews/dtos/create-review.dto";
import { UpdateReviewDetailsDto } from "@modules/reviews/dtos/update-review-details.dto";
import { UpdateReviewRatingDto } from "@modules/reviews/dtos/update-review-rating.dto";
import reviewsController from "@modules/reviews/reviews.controller";
import { Router } from "express";

const router = Router();

router.get("/:reviewId", asyncWrapper(reviewsController.getReviewById));

router.post(
  "/",
  authMiddleware,
  [validationMiddleware(CreateReviewDto)],
  asyncWrapper(reviewsController.createReview)
);

router.patch(
  "/:reviewId",
  authMiddleware,
  [validationMiddleware(UpdateReviewDetailsDto)],
  asyncWrapper(reviewsController.updateReviewDetails)
);

router.patch(
  "/:reviewId/rating",
  authMiddleware,
  [validationMiddleware(UpdateReviewRatingDto)],
  asyncWrapper(reviewsController.updateReviewRating)
);

router.delete(
  "/:reviewId",
  authMiddleware,
  asyncWrapper(reviewsController.deleteReview)
);

export default router;
