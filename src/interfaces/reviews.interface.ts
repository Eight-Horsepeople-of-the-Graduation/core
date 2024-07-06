import { IBookWithoutAuthorsAndGenres } from "./books.interface";
import { ReviewUser } from "./users.interface";

export interface IReview {
  id: number;
  title: string;
  description: string;
  rating: number;
  createdAt: Date;
  userId: number;
  bookId: number;
}

export type OptionalReview = IReview | null;
export type IReviewRatingAggregate = {
  count: { rating: number };
  sum: { rating: number | null };
};
export type IReviewWithUser = IReview & { user: ReviewUser };
export type IReviewWithBook = IReview & { book: IBookWithoutAuthorsAndGenres };
export type IReviewWithUserAndBook = IReviewWithUser & IReviewWithBook;
export type OptionalReviewWithUserAndBook = IReviewWithUserAndBook | null;