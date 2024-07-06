import { ChatDto, CreateConversationDto, CreateMessageDto } from "@dtos";
import conversationRepository from "@repositories/conversations.repository";
import { ChatArgs, buildChat } from "rag-api";
import config from "../config";
import { plainToInstance } from "class-transformer";
import { IConversation } from "../interfaces/conversations.interface";

export const getAllConversations = async () => {
  const conversations = await conversationRepository.getAllConversations();

  return conversations;
};
export const getConversationById = async (id: number) => {
  const conversation = await conversationRepository.getConversationById(id);

  return conversation;
};

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
    conversation =
      await conversationRepository.createConversation(conversationData);
  }

  
  return conversation;
};

export const chat = async (
  bookId: number,
  userId: number,
  chatDto: ChatDto
) => {
  let conversation = await conversationRepository.getConversationByUserAndBook(
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
    conversation =
      await conversationRepository.createConversation(conversationData);
  }
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

export const createConversation = async (
  conversationData: CreateConversationDto
) => {
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

export default {
  getAllConversations,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
  chat,
  getConversationByUserAndBook,
};
