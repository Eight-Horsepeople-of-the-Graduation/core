import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsISBN,
  IsEnum,
  IsOptional,
  IsDate,
  IsPositive,
  ValidateNested,
} from "class-validator";
import { GetAuthorDto } from "./authors.dto";
import { GetGenreDto } from "./genres.dto";

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
  @IsISBN(10 || 13)
  @IsString()
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
  @IsNumber()
  @IsPositive()
  numOfPages: number;

  @IsNotEmpty()
  @IsDate()
  publishDate: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  authors: GetAuthorDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  genres: GetGenreDto[];
}

export class GetBookByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
} 

export class GetBookDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
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
  @IsPositive()
  numOfPages: number;

  @IsNotEmpty()
  publishDate: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  authors: GetAuthorDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  genres: GetGenreDto[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsISBN(10 || 13)
  @IsNumber()
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
  @IsNumber()
  @IsPositive()
  numOfPages: number;

  @IsOptional()
  @IsDate()
  publishDate: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  authors: GetAuthorDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  genres: GetGenreDto[];
}
