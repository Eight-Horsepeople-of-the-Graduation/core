import { Request, Response } from "express";
import conversationsService from "@services/conversations.service";
import { HttpException } from "@exceptions/http.exception";
import { HttpStatus } from "@enums/http-status.enum";

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

export const getConversationByUserAndBook = async (
  req: Request,
  res: Response
) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  if (isNaN(userId) || isNaN(bookId)) {
    throw new HttpException("Invalid user or book id", HttpStatus.BAD_REQUEST);
  }

  const conversation = await conversationsService.getConversationByUserAndBook(
    userId,
    bookId
  );

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
  const bookId = parseInt(req.params.bookId, 10);
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(bookId) || isNaN(userId)) {
    throw new HttpException("Invalid user or book id", HttpStatus.BAD_REQUEST);
  }

  const chatDto = req.body;

  const answer = await conversationsService.chat(bookId, userId, chatDto);

  return res.status(HttpStatus.OK).send({ answer });
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
  getConversationByUserAndBook,
  getConversationById,
  createConversation,
  createMessage,
  getMessagesByConversationId,
  chat,
};
