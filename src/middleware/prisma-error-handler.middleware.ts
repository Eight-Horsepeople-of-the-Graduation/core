import { NextFunction, Request, Response } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import handlePrismaError from "../utils/handle-prisma-error";
export const prismaErrorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof PrismaClientKnownRequestError) {
      const { name, clientVersion, code, message, meta } = error;

      console.error(
        `${name} - ${clientVersion} : ${code}\n` +
          `-----------------Prisma's Message Start--------------- : ${message}\n` +
          `-----------------Prisma's Message End---------------\n` +
          `Meta: ${JSON.stringify(meta)}\n` +
          `Origin: ${req.originalUrl} - ${req.method} - ${req.ip}\n` +
          `Request Body: ${JSON.stringify(req.body)}\n` 
          // `${error.stack}`
      );

      return handlePrismaError(code, meta, res);
    } else if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientValidationError
    ) {
      console.error(
        `${error.name} - ${error.clientVersion}: ${error.message}\n` +
          `Origin: ${req.originalUrl} - ${req.method} - ${req.ip}\n` +
          `Request Body: ${JSON.stringify(req.body)}\n` +
          `${error.stack}`
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