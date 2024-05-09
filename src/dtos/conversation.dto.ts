import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  retriever: string;

  @IsNotEmpty()
  @IsString()
  memory: string;

  @IsNotEmpty()
  @IsString()
  llm: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  bookId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
