import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "@modules/reviews/dtos/reviews.dto";
import reviewsController from "@modules/reviews/reviews.controller";
import { Router } from "express";

const router = Router();

router.get("/:reviewId", asyncWrapper(reviewsController.getReviewById));

router.post(
  "/",
  [validationMiddleware(CreateReviewDto)],
  asyncWrapper(reviewsController.createReview)
);

router.patch(
  "/:reviewId",
  [validationMiddleware(UpdateReviewDetailsDto)],
  asyncWrapper(reviewsController.updateReviewDetails)
);

router.patch(
  "/:reviewId/rating",
  [validationMiddleware(UpdateReviewRatingDto)],
  asyncWrapper(reviewsController.updateReviewRating)
);

router.delete("/:reviewId", asyncWrapper(reviewsController.deleteReview));

export default router;
