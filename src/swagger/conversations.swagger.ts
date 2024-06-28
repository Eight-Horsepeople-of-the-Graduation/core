import { Body, Get, Path, Post, Route, Tags } from "tsoa";
import { ChatDto, CreateConversationDto, CreateMessageDto } from "../dtos";
import { IConversation, IMessage } from "./interfaces";

@Route("conversations")
@Tags("Conversations")
export class ConversationsSwagger {
  @Get("/")
  public getAllConversations(): IConversation[] | any {}

  @Get("/:id")
  public getConversationById(@Path() id: number): IConversation | any {}

  @Post("/chat/:conversationId")
  public chat(
    @Path() conversationId: number,
    @Body() chatDto: ChatDto
  ): { answer: string } | any {}
  @Post("/")
  public createConversation(
    @Body() conversationData: CreateConversationDto
  ): IConversation | any {}

  @Post("/:conversationId/messages")
  public createMessage(
    @Body() messageData: CreateMessageDto,
    @Path() conversationId: number
  ): IMessage | any {}

  @Get("/:conversationId/messages")
  public getMessagesByConversationId(
    @Path() conversationId: number
  ): IMessage[] | any {}
}
