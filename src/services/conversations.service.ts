import conversationRepository from "../repositories/conversations.repository";
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
};
