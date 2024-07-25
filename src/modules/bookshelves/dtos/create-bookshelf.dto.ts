import { Privacy } from "@modules/bookshelves/bookshelf-privacy.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateBookshelfDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(Privacy)
  privacy: Privacy;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;
}
