import { IsOptional, IsString } from "class-validator";

export class UpdateReviewDetailsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
