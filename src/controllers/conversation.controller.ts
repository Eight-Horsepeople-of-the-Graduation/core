import { Request, Response } from "express";
import * as conversationService from "../services/conversation.service";


export const getAllConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getAllConversations();
  return res.status(200).send(conversations);
};
export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Get Conversation Error: Missing Conversation ID");
  }
  const conversation = await conversationService.getConversationById(+id);
  return res.status(200).send(conversation);
};
export const createConversation = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new Error("Create Conversation Error: Missing Conversation Data");
  }
  const conversationData = req.body;
  const createdConversation =
    await conversationService.createConversation(conversationData);

  return res.status(201).send(createdConversation);
};

//message logic here

export const createMessage = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    throw new Error("Create Message Error: Missing Conversation ID");
  }
  if (!req.body) {
    throw new Error("Create Message Error: Missing Message Data");
  }
  const messageData = req.body;
  const createdMessage = await conversationService.createMessage(
    messageData,
    +conversationId
  );
  return res.status(201).send(createdMessage);
};
export const getMessagesByConversationId = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    throw new Error("Get Messages Error: Missing Conversation ID");
  }
  const messages = await conversationService.getMessagesByConversationId(
    +conversationId
  );
  return res.status(200).send(messages);
};
