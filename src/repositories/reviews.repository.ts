import prismaClient from "@utils/prisma";
import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "../dtos/reviews.dto";
import { Prisma, PrismaClient } from "@prisma/client";
import { Transaction } from "../types/prismaClient-transaction.type";

export const getReviewById = async (reviewId: number) => {
  const review = await prismaClient.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return review;
};

export const getReviewsByBookId = async (bookId: number) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      bookId,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return reviews;
};

export const getReviewsByUserId = async (userId: number) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
      user: true,
    },
  });

  return reviews;
};

export const createReview = async (
  createReviewDto: CreateReviewDto,
  tx?: Transaction
) => {
  const prisma = tx || prismaClient;
  const newReview = await prisma.review.create({
    data: createReviewDto,
    include: {
      user: true,
      book: true,
    },
  });

  return newReview;
};

export const updateReviewDetails = async (
  updateReviewDto: UpdateReviewDetailsDto,
  reviewId: number
) => {
  const { title, description } = updateReviewDto;
  const updatedReview = await prismaClient.review.update({
    where: {
      id: reviewId,
    },
    data: {
      title,
      description,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return updatedReview;
};

export const updateReviewRating = async (
  updatedReviewDto: UpdateReviewRatingDto,
  reviewId: number,
  tx?: Transaction
) => {
  const prisma = tx || prismaClient;
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating: updatedReviewDto.rating,
    },
  });

  return updatedReview;
};

export const deleteReview = async (reviewId: number, tx?: Transaction) => {
  const prisma = tx || prismaClient;
  const deletedReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return deletedReview;
};

export const aggregateRatingsByBookId = async (
  bookId: number,
  tx?: Transaction
) => {
  const prisma = tx || prismaClient;
  const currentRatings = await prisma.review.aggregate({
    where: {
      bookId,
    },
    _sum: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    count: currentRatings._count.rating ?? 0,
    sum: currentRatings._sum.rating ?? 0,
  };
};

export default {
  getReviewsByBookId,
  getReviewsByUserId,
  getReviewById,
  createReview,
  updateReviewDetails,
  updateReviewRating,
  deleteReview,
  aggregateRatingsByBookId,
};
