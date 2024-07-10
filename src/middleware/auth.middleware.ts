import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import usersService from "../services/users.service";
import { HttpException } from "../exceptions/http.exception";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(403).send("Access token is required");
  const accessTokenSecret: string | undefined = config.accessToken.secret;

  if (!accessTokenSecret)
    throw new HttpException("Access token secret is not defined", 500);

  try {
    const decoded = jwt.verify(accessToken, accessTokenSecret);
    const userId = parseInt(decoded.sub as string, 10);
    if (!userId) return res.status(403).send("Invalid access token");

    const user = await usersService.getUserById(userId);
    if (!user) return res.status(403).send("User not found");

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).send("Invalid access token");
  }
};
