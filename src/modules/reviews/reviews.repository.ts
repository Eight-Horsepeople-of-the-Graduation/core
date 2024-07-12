import {
  IReview,
  IReviewWithUserAndBook,
  OptionalReviewWithUserAndBook,
} from "@common/interfaces/reviews.interface";
import { Transaction } from "@common/types/prismaClient-transaction.type";
import prismaClient from "@common/utils/prisma";
import {
  CreateReviewDto,
  UpdateReviewDetailsDto,
  UpdateReviewRatingDto,
} from "@modules/reviews/dtos/reviews.dto";

export const getReviewById = async (
  reviewId: number,
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

export const getReviewsByBookId = async (
  bookId: number,
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

// missing: add service, controller, route in users
export const getReviewsByUserId = async (
  userId: number,
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

export const getReviewByUserId = async (
  userId: number,
  reviewId: number,
): Promise<IReviewWithUserAndBook> => {
  const review = await prismaClient.review.findUnique({
    where: {
      id: reviewId,
      user: {
        id: userId,
      },
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

  return review;
};

export const createReview = async (
  createReviewDto: CreateReviewDto,
  tx?: Transaction,
): Promise<IReviewWithUserAndBook> => {
  const prisma = tx || prismaClient;
  const newReview = await prisma.review.create({
    data: createReviewDto,
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

  return newReview;
};

export const updateReviewDetails = async (
  updateReviewDto: UpdateReviewDetailsDto,
  reviewId: number,
): Promise<IReviewWithUserAndBook> => {
  const { title, description } = updateReviewDto;
  const updatedReview: IReviewWithUserAndBook =
    await prismaClient.review.update({
      where: {
        id: reviewId,
      },
      data: {
        title,
        description,
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

export const updateReviewRating = async (
  updatedReviewDto: UpdateReviewRatingDto,
  reviewId: number,
  tx?: Transaction,
): Promise<IReview> => {
  const prisma = tx || prismaClient;
  const updatedReview: IReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating: updatedReviewDto.rating,
    },
  });

  return updatedReview;
};

export const deleteReview = async (
  reviewId: number,
  tx?: Transaction,
): Promise<IReview> => {
  const prisma = tx || prismaClient;
  const deletedReview: IReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return deletedReview;
};

export const aggregateRatingsByBookId = async (
  bookId: number,
  tx?: Transaction,
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
  getReviewByUserId,
  getReviewById,
  createReview,
  updateReviewDetails,
  updateReviewRating,
  deleteReview,
  aggregateRatingsByBookId,
};
