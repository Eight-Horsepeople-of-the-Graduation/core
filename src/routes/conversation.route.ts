import { Router } from "express";
import {
  getAllConversations,
  createConversation,
  getConversationById,
  createMessage,
  getMessagesByConversationId,
} from "../controllers/conversation.controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = Router();
router.get("/", asyncWrapper(getAllConversations));
router.get("/:id", asyncWrapper(getConversationById));
router.get("/messages/:conversationId", asyncWrapper(getMessagesByConversationId));
router.post("/", asyncWrapper(createConversation));
router.post("/messages/:conversationId", asyncWrapper(createMessage));
export default router;
