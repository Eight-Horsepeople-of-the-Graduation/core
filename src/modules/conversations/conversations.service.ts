import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import {
  IConversation,
  OptionalConversation,
} from "@common/interfaces/conversations.interface";
import booksRepository from "@modules/books/books.repository";
import conversationsRepository from "@modules/conversations/conversations.repository";
import {
  ChatDto,
  CreateConversationDto,
  CreateMessageDto,
} from "@modules/conversations/dtos/conversations.dto";
import usersRepository from "@modules/users/users.repository";
import { plainToInstance } from "class-transformer";
import { buildChat, ChatArgs } from "rag-api";
import config from "../../config";

export const getConversationByUserAndBook = async (
  bookId: number,
  userId: number
): Promise<IConversation> => {
  let conversation = await conversationsRepository.getConversationByUserAndBook(
    bookId,
    userId
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
  const conversation: IConversation = await getConversationByUserAndBook(
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
  const chatInstance = buildChat(chatArgs);

  const answer = await chatInstance.invoke({ question });

  return answer.text;
};

export const deleteConversation = async (
  bookId: number,
  userId: number
): Promise<OptionalConversation> => {
  const conversation = conversationsRepository.deleteConversation(
    bookId,
    userId
  );
  return conversation;
};

export const createConversation = async (
  conversationData: CreateConversationDto
): Promise<IConversation> => {
  const conversation =
    await conversationsRepository.createConversation(conversationData);

  return conversation;
};

export const createMessage = async (
  messageData: CreateMessageDto,
  conversationId: number
) => {
  const message = await conversationsRepository.createMessage(
    messageData,
    conversationId
  );

  return message;
};

export const getMessagesByConversationId = async (conversationId: number) => {
  const messages =
    await conversationsRepository.getMessagesByConversationId(conversationId);

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
