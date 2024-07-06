import reviewsService from "@services/reviews.service";
import { Request, Response } from "express";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalReviewWithUserAndBook>> => {
  const id = parseInt(req.params.id, 10);
  const review = await reviewsService.getReviewById(id);

  return res.send(review);
};

// should be in users
export const getReviewsByUserId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook[]>> => {
  const { id } = req.params;
  const reviews = await reviewsService.getReviewsByUserId(+id);

  return res.send(reviews);
};

// should be in books
export const getReviewsByBookId = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook[]>> => {
  const { id } = req.params;
  const reviews = await reviewsService.getReviewsByBookId(+id);

  return res.send(reviews);
};

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response<IReview>> => {
  const createReviewDto = req.body;
  const newReview = await reviewsService.createReviewAndRating(createReviewDto);

  return res.status(201).send(newReview);
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook>> => {
  const reviewId = parseInt(req.params.id, 10);
  const updateReviewDto = req.body;
  const updatedReview = await reviewsService.updateReviewAndRating(
    updateReviewDto,
    reviewId
  );

  return res.send(updatedReview);
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook>> => {
  const reviewId = parseInt(req.params.id, 10);
  const deletedReview = await reviewsService.deleteReviewAndRating(reviewId);

  return res.send(deletedReview);
};

export default {
  getReviewById,
  getReviewsByUserId,
  getReviewsByBookId,
  createReview,
  updateReview,
  deleteReview,
};
