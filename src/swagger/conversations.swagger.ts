import { Body, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { ChatDto, CreateConversationDto, CreateMessageDto } from "../dtos";
import { IConversation } from "../interfaces/conversations.interface";
import { IMessage } from "../interfaces/messages.interface";
import { deleteConversation } from "@repositories/conversations.repository";

@Route("conversations")
@Tags("Conversations")
export class ConversationsSwagger {
  @Post("/chat/user/:userId/book/:bookId")
  public chat(
    @Path() bookId: number,
    @Path() userId: number,
    @Body() chatDto: ChatDto
  ): { answer: string } | any {}

  @Get("/user/:userId/book/:bookId")
  public getConversationByUserAndBook(
    @Path() userId: number,
    @Path() bookId: number
  ): IConversation | any {}

  @Delete("/user/:userId/book/:bookId")
  public deleteConversation(
    @Path() userId: number,
    @Path() bookId: number
  ): IConversation | any {}
}
