import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPositive,
  ValidateNested,
  IsUrl,
  IsInt,
  IsDateString,
} from "class-validator";
import { Format } from "@modules/books/book-format.enum";
import { AuthorDto } from "@modules/authors/dtos/author.dto";
import { GenreDto } from "@modules/genres/dtos/create-genre.dto";

export class GetBookDto {
  @IsNotEmpty()
  bookId: number;

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
