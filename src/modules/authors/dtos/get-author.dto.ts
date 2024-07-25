import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class GetAuthorDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
