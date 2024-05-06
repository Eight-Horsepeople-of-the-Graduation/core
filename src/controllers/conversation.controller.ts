import { Request, Response } from "express";
import * as conversationService from "../services/conversation.service";

export const getAllConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getAllConversations();

  return res.send(conversations);
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const conversation = await conversationService.getConversationById(+id);

  return res.send(conversation);
};

export const createConversation = async (req: Request, res: Response) => {
  const conversationData = req.body;

  const createdConversation =
    await conversationService.createConversation(conversationData);

  return res.status(201).send(createdConversation);
};

//message logic here

export const createMessage = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const messageData = req.body;

  const createdMessage = await conversationService.createMessage(
    messageData,
    +conversationId
  );

  return res.status(201).send(createdMessage);
};

export const getMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  const { conversationId } = req.params;

  const messages =
    await conversationService.getMessagesByConversationId(+conversationId);

  return res.send(messages);
};

export default {
  getAllConversations,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
};
