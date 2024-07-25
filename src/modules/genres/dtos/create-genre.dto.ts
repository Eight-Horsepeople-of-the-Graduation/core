import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
