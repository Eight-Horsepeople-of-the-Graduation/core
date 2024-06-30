import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsISBN,
  IsEnum,
  IsOptional,
  IsPositive,
  ValidateNested,
  IsUrl,
  IsInt,
  IsDateString,
} from "class-validator";
import { AuthorDto } from "./authors.dto";
import { GenreDto } from "./genres.dto";

export enum Format {
  PAPERBACK = "PAPERBACK",
  HARDCOVER = "HARDCOVER",
  EBOOK = "EBOOK",
}

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsISBN(10 || 13)
  isbn: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsEnum(Format)
  format: Format;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  numOfPages: number;

  @IsNotEmpty()
  @IsDateString()
  publishDate: Date;

  @IsOptional()
  @IsString()
  @IsUrl()
  pdfLink: string;

  @IsNotEmpty()
  @ValidateNested()
  authors: AuthorDto[];

  @IsNotEmpty()
  @ValidateNested()
  genres: GenreDto[];
}

export class GetBookByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class GetBookDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  isbn: string;

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

  @IsOptional()
  pdfLink: string;

  @IsNotEmpty()
  @ValidateNested()
  authors: AuthorDto[];

  @IsNotEmpty()
  @ValidateNested()
  genres: GenreDto[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @IsISBN(10 || 13)
  isbn: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsEnum(Format)
  format: Format;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  numOfPages: number;

  @IsOptional()
  @IsDateString()
  publishDate: Date;

  @IsOptional()
  @IsString()
  @IsUrl()
  pdfLink: string;

  @IsOptional()
  @ValidateNested()
  authors: AuthorDto[];

  @IsOptional()
  @ValidateNested()
  genres: GenreDto[];
}
