import { Router } from "express";
import usersController from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";
import { CreateUserDto, UpdateUserDto } from "../dtos";

const router = Router();

router.get("/", asyncWrapper(usersController.getAllUsers));

router.get("/id/:id", asyncWrapper(usersController.getUserById));
router.get("/username/:username", asyncWrapper(usersController.getUserByUsername));

router.post(
  "/",
  // [validationMiddleware(CreateUserDto)],
  asyncWrapper(usersController.createUser)
);

router.put(
  "/:id",
  // validationMiddleware(UpdateUserDto),
  asyncWrapper(usersController.updateUserById)
);

router.delete("/:id", asyncWrapper(usersController.deleteUserById));

export default router;
