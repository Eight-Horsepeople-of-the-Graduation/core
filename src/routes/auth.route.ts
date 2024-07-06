import authController from "@controllers/auth.controller";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";
import { Router } from "express";
import { LogInDto, SignUpDto } from "../dtos/auth.dto";

const router = Router();

router.post(
  "/signup",
  validationMiddleware(SignUpDto),
  asyncWrapper(authController.signUp)
);

router.post(
  "/login",
  validationMiddleware(LogInDto),
  asyncWrapper(authController.logIn)
);

router.delete("/logout", asyncWrapper(authController.logOut));

router.post("/refresh-tokens", asyncWrapper(authController.refreshTokens));

export default router;
