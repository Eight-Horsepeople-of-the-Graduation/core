import reviewsService from "@services/reviews.service";
import { Request, Response } from "express";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";
import usersService from "@services/users.service";
import booksService from "@services/books.service";

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalReviewWithUserAndBook>> => {
  const reviewId = parseInt(req.params.id, 10);
  const review = await reviewsService.getReviewById(+reviewId);

  return res.send(review);
};

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response<IReview>> => {
  const createReviewDto = req.body;

  const newReview = await reviewsService.createReview(createReviewDto);

  return res.status(201).send(newReview);
};

export const updateReviewDetails = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook>> => {
  const reviewId = parseInt(req.params.id, 10);

  const updateReviewDto = req.body;

  const updatedReview = await reviewsService.updateReviewDetails(
    updateReviewDto,
    reviewId
  );

  return res.send(updatedReview);
};

export const updateReviewRating = async (
  req: Request,
  res: Response
): Promise<Response<IReviewWithUserAndBook>> => {
  const reviewId = parseInt(req.params.id, 10);

  const updateReviewDto = req.body;

  const updatedReview = await reviewsService.updateReviewRating(
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

  const deletedReview = await reviewsService.deleteReview(reviewId);

  return res.send(deletedReview);
};

export default {
  getReviewById,
  createReview,
  updateReviewDetails,
  updateReviewRating,
  deleteReview,
};
