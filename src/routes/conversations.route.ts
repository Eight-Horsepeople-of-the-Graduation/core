import { Router } from "express";
import conversationsController from "../controllers/conversations.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "@middleware/validation.middleware";
import {
  CreateConversationDto,
  CreateMessageDto,
} from "../dtos/conversation.dto";

const router: Router = Router();

router.get("/", asyncWrapper(conversationsController.getAllConversations));

router.get("/:id", asyncWrapper(conversationsController.getConversationById));

router.get(
  "/:id/messages",
  asyncWrapper(conversationsController.getMessagesByConversationId)
);

router.post(
  "/",
  [validationMiddleware(CreateConversationDto)],
  asyncWrapper(conversationsController.createConversation)
);

router.post(
  "/:id/messages",
  [validationMiddleware(CreateMessageDto)],
  asyncWrapper(conversationsController.createMessage)
);

export default router;
