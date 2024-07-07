import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(403).send("Access token is required");

  try {
    const decoded = jwt.verify(accessToken, config.accessToken.secret);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).send("Invalid access token");
  }
};
