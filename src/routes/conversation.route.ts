import { Router } from "express";
import conversationController from "../controllers/conversation.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "@middleware/validation.middleware";
import {
  CreateConversationDto,
  CreateMessageDto,
} from "../dtos/conversation.dto";

const router: Router = Router();
router.get("/", asyncWrapper(conversationController.getAllConversations));

router.get("/:id", asyncWrapper(conversationController.getConversationById));

router.get(
  "/:id/messages",
  asyncWrapper(conversationController.getMessagesByConversationId)
);

router.post(
  "/",
  [validationMiddleware(CreateConversationDto)],
  asyncWrapper(conversationController.createConversation)
);

router.post(
  "/:id/messages",
  [validationMiddleware(CreateMessageDto)],
  asyncWrapper(conversationController.createMessage)
);

export default router;
