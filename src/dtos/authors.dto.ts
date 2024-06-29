import { IsNotEmpty, IsString, IsPositive, IsInt } from "class-validator";

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class getAuthorByIdDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  id: number;
}

export class GetAuthorDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
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
  @IsPositive()
  @IsInt()
  id: number;
}
