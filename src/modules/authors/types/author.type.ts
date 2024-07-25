import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class Author {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;
}
