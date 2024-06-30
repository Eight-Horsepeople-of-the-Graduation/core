import prismaClient from "@utils/prisma";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";

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

// missing: add service, controller, route in books
export const getReviewsByBookId = async (bookId: number) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      bookId,
    },
    include: {
      user: true,
    },
  });

  return reviews;
};

// missing: add service, controller, route in users
export const getReviewsByUserId = async (userId: number) => {
  const reviews = await prismaClient.review.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
  });

  return reviews;
};

export const createReview = async (createReviewDto: CreateReviewDto) => {
  const { title, description, rating, bookId, userId } = createReviewDto;
  const newReview = await prismaClient.review.create({
    data: {
      title,
      description,
      rating,
      book: {
        connect: {
          id: bookId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return newReview;
};

export const updateReview = async (
  updateReviewDto: UpdateReviewDto,
  reviewId: number
) => {
  const { title, description, rating } = updateReviewDto;
  const updatedReview = await prismaClient.review.update({
    where: {
      id: reviewId,
    },
    data: {
      title,
      description,
      rating,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return updatedReview;
};

export const deleteReview = async (reviewId: number) => {
  const id = reviewId;
  const review = await prismaClient.review.delete({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return review;
};

export default {
  getReviewsByBookId,
  getReviewsByUserId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
