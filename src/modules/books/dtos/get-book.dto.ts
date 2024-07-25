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
import { Author } from "@modules/authors/types/author.type";
import { Genre } from "@modules/genres/types/genre.type";

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
  authors: Author[];

  @IsNotEmpty()
  @ValidateNested()
  genres: Genre[];
}
