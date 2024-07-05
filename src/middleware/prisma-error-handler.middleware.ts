import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { HttpException } from "../exceptions/http.exception";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import handlePrismaError from "@utils/handle-prisma-error";
export const prismaErrorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof PrismaClientKnownRequestError) {
      const { name, clientVersion, code, message, meta } = error;

      logger.error(
        `${name} - ${clientVersion} : ${code}\n` +
        `Message : ${message}\n` +
        `Meta: ${JSON.stringify(meta)}\n` + 
        `Origin: ${req.originalUrl} - ${req.method} - ${req.ip}\n` +
        `Request Body: ${JSON.stringify(req.body)}\n` + 
        `${error.stack}`
      );

      return handlePrismaError(code, meta, res);
    } else if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientValidationError
    ) {
      logger.error(
        `${error.name} - ${error.clientVersion}: ${error.message}\nOrigin: ${req.originalUrl} - ${req.method} - ${req.ip}\n${error.stack}`
      );
      return res.status(500).send({
        status: 500,
        message: "Something went wrong",
      });
    }
    next(error);
  } catch (err: any) {
    next(err);
  }
};
