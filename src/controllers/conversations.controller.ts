import { Request, Response } from "express";
import conversationsService from "@services/conversations.service";

export const getAllConversations = async (req: Request, res: Response) => {
  const conversations = await conversationsService.getAllConversations();

  return res.send(conversations);
};

export const getConversationById = async (req: Request, res: Response) => {
  const conversationId = parseInt(req.params.genreId, 10);

  const conversation =
    await conversationsService.getConversationById(conversationId);

  return res.send(conversation);
};

export const createConversation = async (req: Request, res: Response) => {
  const createConversationDto = req.body;

  const newConversation = await conversationsService.createConversation(
    createConversationDto
  );

  return res.status(201).send(newConversation);
};

export const chat = async (req: Request, res: Response) => {
  const conversationId = parseInt(req.params.conversationId, 10);
  const chatDto = req.body;

  try {
    const answer = await conversationsService.chat(conversationId, chatDto);

    return res.status(200).send({ answer });
  } catch {
    return res.status(500);
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const conversationId = parseInt(req.params.id, 10);
  const createMessageDto = req.body;

  const message = await conversationsService.createMessage(
    createMessageDto,
    conversationId
  );

  return res.status(201).send(message);
};

export const getMessagesByConversationId = async (
  req: Request,
  res: Response
) => {
  const conversationId = parseInt(req.params.genreId, 10);

  const messages =
    await conversationsService.getMessagesByConversationId(conversationId);

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
