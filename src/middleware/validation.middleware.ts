import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/http.exception";

/**
 * A middleware function that validates the request body against a DTO class.
 * @param dto The DTO class to validate
 * @returns A middleware function that validates the request body against the provided DTO class
 * @example
 * router.post(
 *  "/",
 * [validationMiddleware(CreateUserDto)],
 * usersController.createUser
 * );
 */
export const validationMiddleware = <T>(dto: any): RequestHandler => {
  return async (req, res, next) => {
    const dtoInstance = plainToInstance(dto, req.body);

    const validationErrors = await validate(dtoInstance);

    if (validationErrors.length) {
      const message = validationErrors
        .map((error: ValidationError) => Object.values(error.constraints!))
        .join(",");

      next(new HttpException(message, 400));
    } else {
      next();
    }
  };
};
