import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "../dtos/reviews.dto";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";
import { Body, Delete, Patch, Get, Path, Post, Route, Tags } from "tsoa";

@Route("reviews")
@Tags("Reviews")
export class ReviewsDocs {
  @Get("/:reviewId")
  getReviewById(
    @Path() reviewId: number
  ): OptionalReviewWithUserAndBook | any {}

  @Post("/")
  createReview(
    @Body() createdReviewDto: CreateReviewDto
  ): IReviewWithUserAndBook | any {}

  @Patch("/:reviewId")
  updateReviewDetails(
    @Body() updateReviewDetailsDto: UpdateReviewDetailsDto,
    @Patch() reviewId: number
  ): IReviewWithUserAndBook | any {}

  @Patch("/:reviewId/rating")
  updateReviewRating(
    @Body() updateReviewDto: UpdateReviewRatingDto,
    @Path() reviewId: number
  ): IReview | any {}

  @Delete("/:reviewId")
  deleteReview(@Path() reviewId: number): IReview | any {}
}
