import { authMiddleware } from "@common/middleware/auth.middleware";
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
  authMiddleware,
  [validationMiddleware(ChatDto)],
  asyncWrapper(conversationsController.chat)
);

router.delete(
  "/user/:userId/book/:bookId",
  authMiddleware,
  asyncWrapper(conversationsController.deleteConversation)
);

// router.delete(
//   "/:messageId",
//   asyncWrapper(conversationsController.deleteMessagePair)
// );

export default router;
