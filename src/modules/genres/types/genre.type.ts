import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class Genre {
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
