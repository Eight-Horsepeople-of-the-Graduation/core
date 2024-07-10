import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import usersService from "../services/users.service";
import { HttpException } from "../exceptions/http.exception";

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).send("Refresh token is required");
  const refreshTokenSecret: string | undefined = config.refreshToken.secret;

  if (!refreshTokenSecret)
    throw new HttpException("Refresh token secret is not defined", 500);
  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    const userId = parseInt(decoded.sub as string, 10);
    if (!userId) return res.status(403).send("Invalid refresh token");

    const user = await usersService.getUserById(userId);
    if (!user || !user.refreshToken)
      return res.status(403).send("No refresh token found");

    req.user = user;

    next();
  } catch (err) {
    return res.status(403).send("Invalid refresh token");
  }
};
