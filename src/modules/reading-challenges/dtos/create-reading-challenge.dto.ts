import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
} from "class-validator";

export class CreateReadingChallengeDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Duration)
  type: Duration;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  goal: number;
}
