import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import {
  IConversation,
  OptionalConversation,
} from "@common/interfaces/conversations.interface";
import conversationsService from "@modules/conversations/conversations.service";
import { Request, Response } from "express";

export const getConversationByUserAndBook = async (
  req: Request,
  res: Response
): Promise<Response<IConversation>> => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);

  if (!bookId) {
    throw new HttpException("Book ID is required", HttpStatus.BAD_REQUEST);
  }
  if (!userId) {
    throw new HttpException("User ID is required", HttpStatus.BAD_REQUEST);
  }

  const conversation = await conversationsService.getConversationByUserAndBook(
    userId,
    bookId
  );

  return res.send(conversation);
};

export const chat = async (
  req: Request,
  res: Response
): Promise<Response<{ answer: string }>> => {
  const bookId = parseInt(req.params.bookId, 10);
  const userId = parseInt(req.params.userId, 10);
  if (!bookId) {
    throw new HttpException("Book ID is required", HttpStatus.BAD_REQUEST);
  }
  if (!userId) {
    throw new HttpException("User ID is required", HttpStatus.BAD_REQUEST);
  }

  const chatDto = req.body;

  const answer = await conversationsService.chat(bookId, userId, chatDto);

  return res.status(HttpStatus.OK).send({ answer });
};

export const deleteConversation = async (
  req: Request,
  res: Response
): Promise<Response<OptionalConversation>> => {
  const bookId = parseInt(req.params.bookId, 10);
  const userId = parseInt(req.params.userId, 10);
  if (!bookId) {
    throw new HttpException("Book ID is required", HttpStatus.BAD_REQUEST);
  }
  if (!userId) {
    throw new HttpException("User ID is required", HttpStatus.BAD_REQUEST);
  }

  const conversation = await conversationsService.deleteConversation(
    bookId,
    userId
  );
  if (!conversation) {
    throw new HttpException(
      "No conversation started between the provided user and the provided book",
      HttpStatus.NOT_FOUND
    );
  }
  return res.status(HttpStatus.OK).send(conversation);
};

export default {
  getConversationByUserAndBook,
  deleteConversation,
  chat,
};
