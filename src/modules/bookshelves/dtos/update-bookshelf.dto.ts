import { Privacy } from "@modules/bookshelves/bookshelf-privacy.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateBookshelfDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Privacy)
  privacy?: Privacy;
}
