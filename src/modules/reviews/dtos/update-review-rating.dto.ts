import { IsNumber } from "class-validator";

export class UpdateReviewRatingDto {
  @IsNumber()
  rating: number;

  @IsNumber()
  bookId: number;
}
