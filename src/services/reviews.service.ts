import reviewsRepository from "@repositories/reviews.repository";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";

export const getReviewById = async (reviewId: number) => {
  const review = await reviewsRepository.getReviewById(reviewId);

  return review;
};

// should be in user
export const getReviewsByUserId = async (userId: number) => {
  const reviews = await reviewsRepository.getReviewsByUserId(userId);

  return reviews;
};

// should be in book
export const getReviewsByBookId = async (bookId: number) => {
  const reviews = await reviewsRepository.getReviewsByBookId(bookId);

  return reviews;
};

export const createReview = async (createReviewDto: CreateReviewDto) => {
  const newReview = await reviewsRepository.createReview(createReviewDto);

  return newReview;
};

export const updateReview = async (
  updatedReviewDto: UpdateReviewDto,
  reviewId: number
) => {
  const updatedReview = await reviewsRepository.updateReview(
    updatedReviewDto,
    reviewId
  );

  return updatedReview;
};

export const deleteReview = async (reviewId: number) => {
  const deletedReview = await reviewsRepository.deleteReview(reviewId);

  return deletedReview;
};

export default {
  getReviewById,
  getReviewsByUserId,
  getReviewsByBookId,
  createReview,
  updateReview,
  deleteReview,
};
