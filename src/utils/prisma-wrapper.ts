import { HttpStatus } from "@enums/http-status.enum";
import { HttpException } from "@exceptions/http.exception";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError
} from "@prisma/client/runtime/library";

export async function prismaWrapper<T>(
  handler: (args: any) => Promise<T>,
  args: any
) {
  try {
    const result = await handler(args);
    return result;
  } catch (error: any) {
    console.log("Prisma Error:", JSON.stringify(error));
    switch (error.code) {
      case "P2025":
        throw new HttpException("Record not found.", HttpStatus.NOT_FOUND);
      default:
        throw new HttpException("An error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
