import { Router } from "express";
import usersController from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UpdateUserDto } from "../dtos";

const router = Router();

router.get("/", asyncWrapper(usersController.getAllUsers));

router.get("/:userId", asyncWrapper(usersController.getUserById));

router.put(
  "/:userId",
  validationMiddleware(UpdateUserDto),
  asyncWrapper(usersController.updateUserById)
);

router.delete("/:userId", asyncWrapper(usersController.deleteUserById));

export default router;
