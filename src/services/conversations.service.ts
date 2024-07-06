import { ChatDto, CreateConversationDto, CreateMessageDto } from "../dtos";
import conversationRepository from "../repositories/conversations.repository";
import { ChatArgs, buildChat } from "rag-api";
import config from "../config";
import { plainToInstance } from "class-transformer";
import {
  IConversation,
  OptionalConversation,
} from "../interfaces/conversations.interface";
import usersRepository from "@repositories/users.repository";
import { HttpException } from "@exceptions/http.exception";
import { HttpStatus } from "@enums/http-status.enum";
import booksRepository from "@repositories/books.repository";

export const getConversationByUserAndBook = async (
  userId: number,
  bookId: number
): Promise<IConversation> => {

  let conversation = await conversationRepository.getConversationByUserAndBook(
    userId,
    bookId
  );

  if (!conversation) {
    const conversationData = plainToInstance(CreateConversationDto, {
      retriever: "Pinecone",
      memory: "Buffer Memory",
      llm: "OpenAI",
      bookId,
      userId,
    });
    conversation = await createConversation(conversationData);
  }

  return conversation;
};

export const chat = async (
  bookId: number,
  userId: number,
  chatDto: ChatDto
) => {
  let conversation: IConversation = await getConversationByUserAndBook(
    bookId,
    userId
  );

  const { question } = chatDto;
  const chatArgs: ChatArgs = {
    conversationId: conversation.id,
    bookId,
    llmTemperature: config.llmTemperatureValue, // Hardcoded, because its counter-intuitive to let the frontend team adjust it
    streaming: false, // Hardcoded, because we'll probably need web sockets for streaming to work
    databaseUtils: {
      createMessage,
      getMessagesByConversationId,
    },
  };
  const chat = buildChat(chatArgs);

  const answer = await chat.invoke({ question });

  return answer.text;
};

export const deleteConversation = async (
  bookId: number,
  userId: number
): Promise<OptionalConversation> => {

  const conversation = conversationRepository.deleteConversation(
    bookId,
    userId
  );
  return conversation;
};

export const createConversation = async (
  conversationData: CreateConversationDto
): Promise<IConversation> => {
  const conversation =
    await conversationRepository.createConversation(conversationData);

  return conversation;
};

export const createMessage = async (
  messageData: CreateMessageDto,
  conversationId: number
) => {
  const message = await conversationRepository.createMessage(
    messageData,
    conversationId
  );

  return message;
};

export const getMessagesByConversationId = async (conversationId: number) => {
  const messages =
    await conversationRepository.getMessagesByConversationId(conversationId);

  return messages;
};

export const checkUserAndBook = async (userId: number, bookId: number) => {
  const user = await usersRepository.getUserById(userId);
  if (!user) {
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  const book = await booksRepository.getBookById(bookId);
  if (!book) {
    throw new HttpException("Book does not exist", HttpStatus.NOT_FOUND);
  }
};

export default {
  checkUserAndBook,
  createConversation,
  createMessage,
  getMessagesByConversationId,
  chat,
  getConversationByUserAndBook,
  deleteConversation,
};
