import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
