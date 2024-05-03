import { Router } from "express";
import usersController from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "../dtos";

const router = Router();

router.get("/", asyncWrapper(usersController.getAllUsers));

router.get("/:id", asyncWrapper(usersController.getUserById));

router.post(
  "/",
  [validationMiddleware(CreateUserDto)],
  asyncWrapper(usersController.createUser)
);

router.put(
  "/:id",
  validationMiddleware(UpdateUserDto),
  asyncWrapper(usersController.updateUserById)
);

router.delete("/:id", asyncWrapper(usersController.deleteUserById));

export default router;
