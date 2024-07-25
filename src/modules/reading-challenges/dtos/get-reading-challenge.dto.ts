import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";
import { IsNotEmpty } from "class-validator";

export class GetReadingChallengeDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: Duration;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  progess: number;

  @IsNotEmpty()
  userId: number;
}
