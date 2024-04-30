import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsDate,
  IsOptional,
} from "class-validator";

export enum Duration {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANNUAL = "ANNUAL",
}

export class CreateReadingChallengeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Duration)
  type: Duration;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  progress: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;
}

export class UpdateReadingChallengeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  progress: number;

  @IsNotEmpty()
  @IsEnum(Duration)
  type: Duration;
}

export class GitReadingChallengeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Duration)
  type: Duration;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsNumber()
  progess: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
