import { IsNotEmpty, IsString, IsPositive, IsInt } from "class-validator";

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class GetAuthorDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;
}
