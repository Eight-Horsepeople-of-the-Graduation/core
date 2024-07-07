import reviewsController from "@controllers/reviews.controller";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";
import { Router } from "express";
import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "../dtos/reviews.dto";

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
