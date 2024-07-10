import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import conversationsController from "@modules/conversations/conversations.controller";
import { ChatDto } from "@modules/conversations/dtos/conversations.dto";
import { Router } from "express";

const router = Router();

router.get(
  "/user/:userId/book/:bookId",
  asyncWrapper(conversationsController.getConversationByUserAndBook)
);

router.post(
  "/chat/user/:userId/book/:bookId",
  [validationMiddleware(ChatDto)],
  asyncWrapper(conversationsController.chat)
);

router.delete(
  "/user/:userId/book/:bookId",

  asyncWrapper(conversationsController.deleteConversation)
);

// router.delete(
//   "/:messageId",
//   asyncWrapper(conversationsController.deleteMessagePair)
// );

export default router;
