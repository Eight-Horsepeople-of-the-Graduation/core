import { authMiddleware } from "@common/middleware/auth.middleware";
import { refreshTokenMiddleware } from "@common/middleware/refresh-tokens.middleware";
import { validationMiddleware } from "@common/middleware/validation.middleware";
import asyncWrapper from "@common/utils/async-wrapper";
import authController from "@modules/auth/auth.controller";
import { LogInDto, SignUpDto } from "@modules/auth/dtos/auth.dto";
import { Router } from "express";

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
