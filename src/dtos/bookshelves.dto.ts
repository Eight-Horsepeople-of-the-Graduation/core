import { Privacy } from "@prisma/client";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class GetDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(Privacy)
  privacy: Privacy;
}

export class GetByTitleDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class GetByIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(Privacy)
  @IsOptional()
  privacy: Privacy;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  privacy: Privacy;
}
