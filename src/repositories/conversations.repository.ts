import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { CreateConversationDto, CreateMessageDto } from "@dtos";
import { prismaWrapper } from "@utils/prisma-wrapper";
import prismaClient from "@utils/prisma";

export const getAllConversations = async () => {
  const conversations = await prismaWrapper(prismaClient.conversation.findMany,{
    include: {
      messages: true,
    },
  });

  return conversations;
};

export const getConversationById = async (id: number) => {
  const conversation = await prismaWrapper(prismaClient.conversation.findUnique,{
    where: {
      id: id,
    },
    include: {
      messages: true,
    },
  });

  return conversation;
};

export const createConversation = async (
  conversationData: CreateConversationDto
) => {
  const conversation = await prismaWrapper(prismaClient.conversation.create,{
    data: conversationData,
  });

  return conversation;
};

//message logic here

export const createMessage = async (
  messageData: CreateMessageDto,
  coversationid: number
) => {
  const message = await prismaWrapper(prismaClient.message.create,{
    data: {
      ...messageData,
      conversation: {
        connect: {
          id: coversationid,
        },
      },
    },
  });

  return message;
};

export const getMessagesByConversationId = async (conversationId: number) => {
  const messages = await prismaWrapper(prismaClient.message.findMany,{
    where: {
      conversationId,
    },
  });

  const asLangChainMessage = (
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
    const convertedMessage = asLangChainMessage(message.role, message.content);

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
