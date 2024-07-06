import prismaClient from "@utils/prisma";
import { CreateReviewDto, UpdateReviewDto } from "../dtos/reviews.dto";
import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReview,
  IReviewRatingAggregate,
  OptionalReviewWithUserAndBook,
} from "../interfaces/reviews.interface";

export const getReviewById = async (
  reviewId: number
): Promise<OptionalReviewWithUserAndBook> => {
  const review: OptionalReviewWithUserAndBook =
    await prismaClient.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
        book: true,
      },
    });

  return review;
};

// missing: add service, controller, route in books
export const getReviewsByBookId = async (
  bookId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews: IReviewWithUserAndBook[] = await prismaClient.review.findMany({
    where: {
      bookId,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          profilePicture: true,
        },
      },
      book: true,
    },
  });

  return reviews;
};

export const aggregateRatingsByBookId = async (
  bookId: number
): Promise<IReviewRatingAggregate> => {
  const currentRatings = await prismaClient.review.aggregate({
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
    count: currentRatings._count,
    sum: currentRatings._sum,
  };
};

// missing: add service, controller, route in users
export const getReviewsByUserId = async (
  userId: number
): Promise<IReviewWithUserAndBook[]> => {
  const reviews: IReviewWithUserAndBook[] = await prismaClient.review.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
      user: {
        select: {
          username: true,
          name: true,
          profilePicture: true,
        },
      },
    },
  });

  return reviews;
};

export const createReview = async (
  createReviewDto: CreateReviewDto
): Promise<IReview> => {
  const { title, description, rating, bookId, userId } = createReviewDto;
  const newReview: IReview = await prismaClient.review.create({
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
): Promise<IReviewWithUserAndBook> => {
  const { title, description, rating } = updateReviewDto;
  const updatedReview: IReviewWithUserAndBook =
    await prismaClient.review.update({
      where: {
        id: reviewId,
      },
      data: {
        title,
        description,
        rating,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
        book: true,
      },
    });

  return updatedReview;
};

export const deleteReview = async (
  reviewId: number
): Promise<IReviewWithUserAndBook> => {
  const id = reviewId;
  const review: IReviewWithUserAndBook = await prismaClient.review.delete({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          profilePicture: true,
        },
      },
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
  aggregateRatingsByBookId,
};
