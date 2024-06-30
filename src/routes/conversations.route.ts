import { Router } from "express";
import conversationsController from "@controllers/conversations.controller";
import { CreateConversationDto, CreateMessageDto } from "@dtos";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";

const router: Router = Router();

router.get("/", asyncWrapper(conversationsController.getAllConversations));

router.get(
  "/:conversationId",
  asyncWrapper(conversationsController.getConversationById)
);

router.get(
  "/:conversationId/messages",
  asyncWrapper(conversationsController.getMessagesByConversationId)
);

router.post(
  "/chat/:conversationId",
  asyncWrapper(conversationsController.chat)
);

router.post(
  "/",
  [validationMiddleware(CreateConversationDto)],
  asyncWrapper(conversationsController.createConversation)
);

router.post(
  "/:conversationId/messages",
  [validationMiddleware(CreateMessageDto)],
  asyncWrapper(conversationsController.createMessage)
);

export default router;
