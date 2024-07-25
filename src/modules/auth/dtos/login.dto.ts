import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

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
