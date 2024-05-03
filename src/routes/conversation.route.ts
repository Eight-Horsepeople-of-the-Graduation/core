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
router.get("/", asyncWrapper(asyncWrapper(getAllConversations)));
router.get("/:id", asyncWrapper(asyncWrapper(getConversationById)));
router.get("/messages/:conversationId", asyncWrapper(getMessagesByConversationId));
router.post("/", asyncWrapper(asyncWrapper(createConversation)));
router.post("/messages/:conversationId", asyncWrapper(createMessage));
export default router;
