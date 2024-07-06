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

router.get("/:id", asyncWrapper(reviewsController.getReviewById));

// should be in user route  /users/:id/reviews
router.get("/user/:id", asyncWrapper(reviewsController.getReviewsByUserId));

router.post(
  "/",
  [validationMiddleware(CreateReviewDto)],
  asyncWrapper(reviewsController.createReview)
);

router.patch(
  "/:id",
  [validationMiddleware(UpdateReviewDetailsDto)],
  asyncWrapper(reviewsController.updateReviewDetails)
);

router.patch(
  "/:id/rating",
  [validationMiddleware(UpdateReviewRatingDto)],
  asyncWrapper(reviewsController.updateReviewRating)
);

router.delete("/:id", asyncWrapper(reviewsController.deleteReview));

export default router;
