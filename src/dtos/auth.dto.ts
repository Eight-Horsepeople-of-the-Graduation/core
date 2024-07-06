import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";
import { Gender } from "./users.dto";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 64)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 64)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(6, 64)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  password: string;
}
