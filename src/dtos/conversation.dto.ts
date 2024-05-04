import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
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
