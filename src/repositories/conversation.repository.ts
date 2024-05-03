import prismaClient from "../utils/prisma";
import {
  CreateConversationDto,
  CreateMessageDto,
} from "../dtos/conversation.dto";

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

  return messages;
};

export default {
  getAllConversations,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
};
