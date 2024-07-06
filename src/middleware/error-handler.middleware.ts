import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { HttpException } from "../exceptions/http.exception";

export const errorHandlerMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = error.status || 500;
    const message = error.response || "Something went wrong";

    logger.error(
      `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    const sanitizedError = new Error(message) as any;
    sanitizedError.status = status;

    return res.status(status).send({
      status,
      message,
    });

  } catch (err: any) {
    next(err);
  }
};
