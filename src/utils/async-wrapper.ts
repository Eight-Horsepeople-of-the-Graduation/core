import { NextFunction, Request, Response } from "express";
import logger from "./logger";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Wraps an async route handler to catch any errors and pass them to the error handling middleware
 * @param handler - The async route handler
 * @returns The wrapped route handler
 * @example
 * router.get("/", asyncWrapper(usersController.getAllUsers));
 */
const asyncWrapper = (handler: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      logger.error(error.stack);
      next(error);
    }
  };
};

export default asyncWrapper;
