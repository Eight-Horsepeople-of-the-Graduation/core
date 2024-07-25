import { Format } from "@modules/books/book-format.enum";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  //  @IsISBN(10 || 13)
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

  @IsOptional()
  @IsString()
  @IsUrl()
  coverPicture: string;

  @IsNotEmpty()
  authors: number[];

  @IsNotEmpty()
  genres: number[];
}
