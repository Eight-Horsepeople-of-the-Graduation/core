import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).send("Refresh token is required");

  try {
    jwt.verify(refreshToken, config.refreshToken.secret);

    next();
  } catch (err) {
    return res.status(403).send("Invalid refresh token");
  }
};
