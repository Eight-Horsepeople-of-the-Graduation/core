import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import usersService from "@modules/users/users.service";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(403).send("Access token is required");
  try {
    const decoded = jwt.verify(accessToken, config.accessToken.secret);
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
