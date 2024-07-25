import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class GetGenreDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
