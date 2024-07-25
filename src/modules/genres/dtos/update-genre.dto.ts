import { IsOptional, IsString } from "class-validator";

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
