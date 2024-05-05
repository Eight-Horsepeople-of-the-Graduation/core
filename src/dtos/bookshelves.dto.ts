import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export enum Privacy {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export class GetBookshelvesDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  privacy: Privacy;
}

export class GetBookshelvesByTitleDto {
  @IsNotEmpty()
  title: string;
}

export class GetBookshelvesByIdDto {
  @IsNotEmpty()
  id: number;
}

export class CreateBooshelvesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Privacy)
  @IsOptional()
  privacy: Privacy;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
}

export class UpdateBookshelvesDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  privacy: Privacy;
}
