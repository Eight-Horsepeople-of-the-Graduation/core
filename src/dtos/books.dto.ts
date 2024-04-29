import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsISBN,
  IsEnum,
  IsOptional,
  IsDate,
  ValidateNested,
  isArray,
} from "class-validator";

export enum Format {
  PAPERBACK,
  HARDCOVER,
  EBOOK,
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsISBN(10 || 13)
  @IsNumber()
  @IsNotEmpty()
  isbn: number;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsEnum(Format)
  format: Format;

  @IsOptional()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  numOfPages: number;

  @IsOptional()
  @IsDate()
  publishDate: Date;

  @IsNotEmpty()
  @IsString()
  authors: string[];

  @IsNotEmpty()
  @IsString()
  genres: string[];
}

export class GetBookDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  isbn: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  format: Format;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  numOfPages: number;

  @IsNotEmpty()
  publishDate: Date;

  @IsNotEmpty()
  authors: string[];

  @IsNotEmpty()
  genres: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsISBN(10 || 13)
  @IsNumber()
  @IsNotEmpty()
  isbn: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Format)
  format: Format;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  numOfPages: number;

  @IsOptional()
  @IsDate()
  publishDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  authors: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genres: string[];
}
