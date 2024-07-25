import {
  IConversation,
  OptionalConversation,
} from "@common/interfaces/conversations.interface";
import prismaClient from "@common/utils/prisma";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { CreateConversationDto } from "@modules/conversations/dtos/create-conversation.dto";
import { CreateMessageDto } from "@modules/conversations/dtos/create-message.dto";

export const createConversation = async (
  conversationData: CreateConversationDto
): Promise<IConversation> => {
  const conversation: IConversation = await prismaClient.conversation.create({
    data: conversationData,
    select: {
      id: true,
      messages: {
        select: {
          id: true,
          createdOn: true,
          role: true,
          content: true,
          conversationId: false,
        },
      },
      createdOn: true,
      bookId: true,
      userId: true,
      retriever: false,
      llm: false,
      memory: false,
    },
  });

  return conversation;
};

export const getConversationByUserAndBook = async (
  bookId: number,
  userId: number
): Promise<OptionalConversation> => {
  const conversation = await prismaClient.conversation.findUnique({
    where: {
      bookId_userId: {
        bookId,
        userId,
      },
    },
    select: {
      id: true,
      messages: {
        select: {
          id: true,
          createdOn: true,
          role: true,
          content: true,
          conversationId: false,
        },
      },
      createdOn: true,
      bookId: true,
      userId: true,
      retriever: false,
      llm: false,
      memory: false,
    },
  });

  return conversation;
};

export const deleteConversation = async (
  bookId: number,
  userId: number
): Promise<OptionalConversation> => {
  const conversation = await prismaClient.conversation.findUnique({
    where: {
      bookId_userId: {
        bookId,
        userId,
      },
    },
    select: {
      id: true,
      messages: {
        select: {
          id: true,
          createdOn: true,
          role: true,
          content: true,
          conversationId: false,
        },
      },
      createdOn: true,
      bookId: true,
      userId: true,
      retriever: false,
      llm: false,
      memory: false,
    },
  });

  await prismaClient.message.deleteMany({
    where: {
      conversationId: conversation?.id,
    },
  });

  return conversation;
};

export const getConversationById = async (id: number) => {
  const conversation = await prismaClient.conversation.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    },
  });

  return conversation;
};

export const createMessage = async (
  messageData: CreateMessageDto,
  coversationid: number
) => {
  const message = await prismaClient.message.create({
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
  const messages = await prismaClient.message.findMany({
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
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
  getConversationByUserAndBook,
  deleteConversation,
};
