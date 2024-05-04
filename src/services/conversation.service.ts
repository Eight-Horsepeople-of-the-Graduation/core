import conversationRepository from "../repositories/conversation.repository";
import {
  CreateConversationDto,
  CreateMessageDto,
} from "../dtos/conversation.dto";

export const getAllConversations = async () => {
  const conversations = await conversationRepository.getAllConversations();

  return conversations;
};
export const getConversationById = async (id: number) => {
  const conversation = await conversationRepository.getConversationById(id);

  return conversation;
};

export const createConversation = async (
  conversationData: CreateConversationDto
) => {
  const createdConversation =
    await conversationRepository.createConversation(conversationData);

  return createdConversation;
};

//message logic here

export const createMessage = async (
  messageData: CreateMessageDto,
  conversationId: number
) => {
  const createdMessage = await conversationRepository.createMessage(
    messageData,
    conversationId
  );

  return createdMessage;
};

export const getMessagesByConversationId = async (conversationId: number) => {
  const messages =
    await conversationRepository.getMessagesByConversationId(conversationId);

  return messages;
};
