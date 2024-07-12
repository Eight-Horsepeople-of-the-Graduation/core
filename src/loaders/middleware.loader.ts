import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import config from "../config";

/**
 * Load main middleware (logging, cors, rate limiting, security, parsing, etc.)
 * @param app Express app
 * @returns void
 */
const loadMainMiddleware = (app: Express) => {
  app.use(morgan("dev"));

  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100,
      standardHeaders: true,
      legacyHeaders: true,
      message: "Too many requests, please try again later.",
    }),
  );

  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cookieParser(config.cookieSecret, {
      httpOnly: true,
      signed: true,
    } as cookieParser.CookieParseOptions),
  );
};

export default loadMainMiddleware;
