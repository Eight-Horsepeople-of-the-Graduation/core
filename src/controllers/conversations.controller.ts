import { Request, Response } from "express";
import conversationsService from "../services/conversations.service";
import { buildChat, ChatArgs } from "rag-api";

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

export const createMessage = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const messageData = req.body;

  const conversation = await conversationsService.getConversationById(id);
  const message = await conversationsService.createMessage(messageData, id);

  const chatArgs: ChatArgs = {
    conversation_id: id,
    pdf_id: "fb5513f9-b881-4a0d-80ea-e902f224195c",
    streaming: false,
  };

  const chat = await buildChat(chatArgs);

  let question = message.content;
  let answer = await chat.invoke({ question });
  console.log(answer);

  return res.status(201).send(answer);
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
};
