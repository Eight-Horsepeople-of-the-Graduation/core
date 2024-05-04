import prismaClient from "../utils/prisma";
import {
  CreateConversationDto,
  CreateMessageDto,
} from "../dtos/conversation.dto";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export const getAllConversations = async () => {
  const conversations = await prismaClient.conversation.findMany({
    include: {
      message: true,
    },
  });
  return conversations;
};
export const getConversationById = async (id: number) => {
  const conversation = await prismaClient.conversation.findUnique({
    where: {
      id: id,
    },
    include: {
      message: true,
    },
  });
  return conversation;
};
export const createConversation = async (
  conversationData: CreateConversationDto
) => {
  const createConversation = await prismaClient.conversation.create({
    data: conversationData,
  });
  return createConversation;
};

//message logic here

export const createMessage = async (
  messageData: CreateMessageDto,
  coversationid: number
) => {
  const createMessage = await prismaClient.message.create({
    data: {
      ...messageData,
      conversation: {
        connect: {
          id: coversationid,
        },
      },
    },
  });
  return createMessage;
};

export const getMessagesByConversationId = async (conversationId: number) => {
  const messages = await prismaClient.message.findMany({
    where: {
      conversationId: conversationId,
    },
  });

  const asLcMessage = (
    role: string,
    content: string
  ): AIMessage | HumanMessage | SystemMessage => {
    switch (role) {
      case "human":
        return new HumanMessage({ content });
      case "ai":
        return new AIMessage({ content });
      case "system":
        return new SystemMessage({ content });
      default:
        throw new Error(`Unknown message role: ${role}`);
    }
  };

  const convertedMessages = messages.map((message) => {
    const convertedMessage = asLcMessage(message.role, message.content);

    return convertedMessage;
  });

  return convertedMessages;
};

export default {
  getAllConversations,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
};
