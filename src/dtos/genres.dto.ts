import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: String;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GetGenreDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: String;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  title: String;

  @IsOptional()
  @IsString()
  description: string;
}
