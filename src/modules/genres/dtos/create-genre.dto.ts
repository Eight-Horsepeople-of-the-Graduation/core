import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GenreDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
