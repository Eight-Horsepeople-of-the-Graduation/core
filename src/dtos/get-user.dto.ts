import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export class GetUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  // @Length(3, 20)
  username: string;

  @IsNotEmpty()
  // @IsEmail()
  email: string;

  // @IsString()
  // @Length(8, 24)
  // password: string

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
  profilePicture?: string;

  @IsBoolean()
  isAdmin: boolean;
}
