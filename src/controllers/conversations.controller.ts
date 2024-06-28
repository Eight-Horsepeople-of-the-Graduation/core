import { Request, Response } from "express";
import conversationsService from "@services/conversations.service";

export const getAllConversations = async (req: Request, res: Response) => {
  const conversations = await conversationsService.getAllConversations();
  return res.send(conversations);
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const conversation = await conversationsService.getConversationById(+id);

  return res.send(conversation);
};

export const createConversation = async (req: Request, res: Response) => {
  const conversationData = req.body;

  const createdConversation =
    await conversationsService.createConversation(conversationData);

  return res.status(201).send(createdConversation);
};

export const chat = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const chatDto = req.body;
  try {
    const answer = await conversationsService.chat(+conversationId, chatDto);
    return res.status(200).send({ answer });
  } catch {
    return res.status(500);
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const messageData = req.body;

  const conversation = await conversationsService.getConversationById(id);
  const message = await conversationsService.createMessage(messageData, id);

  return res.status(201).send(message);
};

export const getMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const messages = await conversationsService.getMessagesByConversationId(+id);

  return res.send(messages);
};

export default {
  getAllConversations,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
  chat,
};
