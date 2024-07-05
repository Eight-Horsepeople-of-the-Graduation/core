import { HttpStatus } from "@enums/http-status.enum";
import { HttpException } from "@exceptions/http.exception";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export async function prismaWrapper<T>(
  handler: (args: any) => Promise<T>,
  args: any
) {
  try {
    const result = await handler(args);
    return result;
  } catch (error: any) {
    throw error;
  }
}
