import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import usersService from "@services/users.service";

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).send("Refresh token is required");

  try {
    const decoded = jwt.verify(refreshToken, config.refreshToken.secret);
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
