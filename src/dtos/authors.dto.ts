import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class GetAuthorDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name: string;
}
