import reviewsRepository from "../repositories/reviews.repository";
import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "../dtos/reviews.dto";
import prismaClient from "../utils/prisma";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";
import booksService from "./books.service";

export const getReviewById = async (
  reviewId: number
): Promise<OptionalReviewWithUserAndBook> => {
  const review = await reviewsRepository.getReviewById(reviewId);

  return review;
};

export function createReview(
  createdReviewDto: CreateReviewDto
): Promise<IReviewWithUserAndBook> {
  return prismaClient.$transaction(async (tx) => {
    await booksService.updateBookRating(
      createdReviewDto.rating,
      createdReviewDto.bookId,
      true,
      tx
    );

    const newReview = await reviewsRepository.createReview(
      createdReviewDto,
      tx
    );

    return newReview;
  });
}

export const updateReviewDetails = async (
  updateReviewDetailsDto: UpdateReviewDetailsDto,
  reviewId: number
): Promise<IReviewWithUserAndBook> => {
  const updatedReview = await reviewsRepository.updateReviewDetails(
    updateReviewDetailsDto,
    reviewId
  );

  return updatedReview;
};

export function updateReviewRating(
  updateReviewDto: UpdateReviewRatingDto,
  reviewId: number
) : Promise<IReview> {
  return prismaClient.$transaction(async (tx) => {
    await booksService.updateBookRating(
      updateReviewDto.rating,
      updateReviewDto.bookId,
      true,
      tx
    );
    const updatedReview = await reviewsRepository.updateReviewRating(
      updateReviewDto,
      reviewId,
      tx
    );

    return updatedReview;
  });
}

export function deleteReview(reviewId: number) {
  return prismaClient.$transaction(async (tx) => {
    const review = await getReviewById(reviewId);

    await booksService.updateBookRating(
      review!.rating,
      review!.bookId,
      false,
      tx
    );

    const deletedReview = await reviewsRepository.deleteReview(reviewId, tx);

    return deletedReview;
  });
}

export default {
  getReviewById,
  createReview,
  updateReviewDetails,
  updateReviewRating,
  deleteReview,
};
