import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateReadingChallengeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  goal?: number;
}
