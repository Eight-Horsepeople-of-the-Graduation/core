import { ChatDto, CreateConversationDto, CreateMessageDto } from "@dtos";
import conversationRepository from "@repositories/conversations.repository";
import { ChatArgs, buildChat } from "rag-api";
import config from "../config";

export const getAllConversations = async () => {
  const conversations = await conversationRepository.getAllConversations();

  return conversations;
};
export const getConversationById = async (id: number) => {
  const conversation = await conversationRepository.getConversationById(id);

  return conversation;
};

export const chat = async (conversationId: number, chatDto: ChatDto) => {
  const { bookId, question } = chatDto;
  const chatArgs: ChatArgs = {
    conversationId,
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
};
