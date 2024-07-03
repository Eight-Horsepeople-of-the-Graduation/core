import reviewsRepository from "../repositories/reviews.repository";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";
import prismaClient from "../utils/prisma";
import booksRepository from "../repositories/books.repository";

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

export function createReviewAndRating(createReviewDto: CreateReviewDto) {
  return prismaClient.$transaction(async (prisma) => {
    const newReview = await reviewsRepository.createReview(createReviewDto);

    await booksRepository.updateBookRating(createReviewDto);

    return newReview;
  });
}

export function updateReviewAndRating(
  updatedReviewDto: UpdateReviewDto,
  reviewId: number
) {
  return prismaClient.$transaction(async (prisma) => {
    const updatedReview = await reviewsRepository.updateReview(
      updatedReviewDto,
      reviewId
    );

    await booksRepository.updateBookRating(updatedReviewDto);

    return updatedReview;
  });
}

export function deleteReviewAndRating(
  updatedReviewDto: UpdateReviewDto,
  reviewId: number
) {
  return prismaClient.$transaction(async (prisma) => {
    const deletedReview = await reviewsRepository.deleteReview(reviewId);

    await booksRepository.removeBookRating(updatedReviewDto);

    return deletedReview;
  });
}

export const deleteReview = async (reviewId: number) => {};

export default {
  getReviewById,
  getReviewsByUserId,
  getReviewsByBookId,
  deleteReview,
  createReviewAndRating,
  updateReviewAndRating,
};
