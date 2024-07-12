import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import logger from "@common/utils/logger";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (error instanceof HttpException) {
      const status = error.status || 500;
      const message = error.response || "Something went wrong";
      logger.error(
        `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );

      return res.status(status).send({
        status,
        message,
      });
    } else {
      logger.error(
        `Unhandled Error : ${error} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${JSON.stringify(error)}`,
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
      });
    }
  } catch (err: any) {
    next(err);
  }
};
