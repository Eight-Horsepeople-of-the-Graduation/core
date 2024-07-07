import authController from "@controllers/auth.controller";
import { validationMiddleware } from "@middleware/validation.middleware";
import asyncWrapper from "@utils/async-wrapper";
import { Router } from "express";
import { LogInDto, SignUpDto } from "../dtos/auth.dto";
import { authMiddleware } from "@middleware/auth.middleware";
import { refreshTokenMiddleware } from "@middleware/refresh-tokens.middleware";

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

router.delete("/logout", [authMiddleware], asyncWrapper(authController.logOut));

router.post(
  "/refresh-tokens",
  [refreshTokenMiddleware],
  asyncWrapper(authController.refreshTokens)
);

export default router;
