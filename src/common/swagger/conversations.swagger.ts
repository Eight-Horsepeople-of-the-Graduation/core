import { IConversation } from "@common/interfaces/conversations.interface";
import { ChatDto } from "@modules/conversations/dtos/conversations.dto";
import { Body, Delete, Get, Path, Post, Route, Tags } from "tsoa";

@Route("conversations")
@Tags("Conversations")
export class ConversationsSwagger {
  @Post("/chat/user/:userId/book/:bookId")
  public chat(
    @Path() userId: number,
    @Path() bookId: number,
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
