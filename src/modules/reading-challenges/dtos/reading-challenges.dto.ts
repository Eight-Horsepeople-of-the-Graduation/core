import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
  IsInt,
  IsPositive,
  IsOptional,
} from "class-validator";

export enum Duration {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANNUAL = "ANNUAL",
}

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

export class UpdateReadingChallengeDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  goal: number;
}

export class GetReadingChallengeDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: Duration;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  progess: number;

  @IsNotEmpty()
  userId: number;
}
