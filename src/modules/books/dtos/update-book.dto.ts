import { Author } from "@modules/authors/types/author.type";
import { Format } from "@modules/books/book-format.enum";
import { Genre } from "@modules/genres/types/genre.type";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  //  @IsISBN(10 || 13)
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
  @IsString()
  @IsUrl()
  coverPicture: string;

  @IsOptional()
  @ValidateNested()
  authors: Author[];

  @IsOptional()
  @ValidateNested()
  genres: Genre[];
}
