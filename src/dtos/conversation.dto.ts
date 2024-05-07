import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  retriever: string;

  @IsNotEmpty()
  @IsString()
  memory: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  llm: string;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
