import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export class GetUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @IsDate()
  joinDate: Date;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}

export class CreateUserDto {
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
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}

const s = new Set();
