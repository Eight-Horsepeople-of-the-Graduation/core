import reviewsService from "../services/reviews.service";
import { Request, Response } from "express";

export const getReviewById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const review = await reviewsService.getReviewById(id);

  return review;
};

// should be in users
export const getReviewsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await reviewsService.getReviewsByUserId(+id);

  return res.send(reviews);
};

// should be in books
export const getReviewsByBookId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = await reviewsService.getReviewsByBookId(+id);

  return res.send(reviews);
};

export const createReview = async (req: Request, res: Response) => {
  const createReviewDto = req.body;
  const newReview = await reviewsService.createReview(createReviewDto);

  return res.status(201).send(newReview);
};

export const updateReview = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.id, 10);
  const updateReviewDto = req.body;
  const updatedReview = await reviewsService.updateReview(
    updateReviewDto,
    reviewId
  );

  return res.send(updatedReview);
};

export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.id, 10);
  const deletedReview = await reviewsService.deleteReview(reviewId);

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
