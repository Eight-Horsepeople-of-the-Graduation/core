import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsEnum(Privacy)
  privacy: Privacy;
}

export class GetBookshelvesByTitleDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class GetBookshelvesByIdDto {
  @IsNotEmpty()
  @IsNumber()
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
