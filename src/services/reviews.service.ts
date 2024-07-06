import reviewsRepository from "../repositories/reviews.repository";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";
import prismaClient from "../utils/prisma";
import booksRepository from "../repositories/books.repository";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";

export const getReviewById = async (
  reviewId: number
): Promise<OptionalReviewWithUserAndBook> => {
  const review = await reviewsRepository.getReviewById(reviewId);

  return review;
};

// should be in user
export const getReviewsByUserId = async (
  userId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews = await reviewsRepository.getReviewsByUserId(userId);

  return reviews;
};

// should be in book
export const getReviewsByBookId = async (
  bookId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews = await reviewsRepository.getReviewsByBookId(bookId);

  return reviews;
};

export function createReviewAndRating(
  createReviewDto: CreateReviewDto
): Promise<IReview> {
  return prismaClient.$transaction(async (prisma) => {
    const newReview = await reviewsRepository.createReview(createReviewDto);

    await booksRepository.updateBookRating(createReviewDto);

    return newReview;
  });
}

export function updateReviewAndRating(
  updatedReviewDto: UpdateReviewDto,
  reviewId: number
): Promise<IReviewWithUserAndBook> {
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
  reviewId: number
): Promise<IReviewWithUserAndBook> {
  return prismaClient.$transaction(async (prisma) => {
    const deletedReview = await reviewsRepository.deleteReview(reviewId);

    await booksRepository.removeBookRating({
      bookId: deletedReview.bookId,
      rating: deletedReview.rating,
    });

    return deletedReview;
  });
}

export default {
  getReviewById,
  getReviewsByUserId,
  getReviewsByBookId,
  createReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
  
};
