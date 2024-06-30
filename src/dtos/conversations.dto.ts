import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
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

export class ChatDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsString()
  question: string;
}
