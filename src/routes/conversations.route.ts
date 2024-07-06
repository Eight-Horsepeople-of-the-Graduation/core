import { Router } from "express";
import conversationsController from "@controllers/conversations.controller";
import { ChatDto, CreateConversationDto, CreateMessageDto } from "@dtos";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";

const router: Router = Router();

// router.get("/", asyncWrapper(conversationsController.getAllConversations));


router.get(
  "/user/:userId/book/:bookId",
  asyncWrapper(conversationsController.getConversationByUserAndBook)
);

router.post(
  "/chat/user/:userId/book/:bookId",
  [validationMiddleware(ChatDto)],
  asyncWrapper(conversationsController.chat)
);

// router.delete(
//   "/user/:userId/book/:bookId",

//   asyncWrapper(conversationsController.deleteConversation)
// );

// router.delete(
//   "/:messageId",
//   asyncWrapper(conversationsController.deleteMessagePair)
// );



export default router;
