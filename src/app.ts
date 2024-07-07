import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import * as swaggerUI from "swagger-ui-express";
import config from "./config";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import loadRouters from "@loaders/express";
import * as swaggerJson from "./swagger/swagger.json";
import logger from "@utils/logger";
import { prismaErrorHandlerMiddleware } from "@middleware/prisma-error-handler.middleware";
import helmet from "helmet";

/**
 * Starts the server
 * @returns void
 */
const startServer = async () => {
  const app = express();
  const port = config.port;

  app.use(morgan("dev"));
  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieParser(config.cookieSecret, {
      httpOnly: true,
      signed: true,
    } as any)
  );

  loadRouters(app);

  app.use(["/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

  app.use(prismaErrorHandlerMiddleware)
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
    logger.info(`See Docs at http://localhost:${port}/docs`);
  });
};

startServer();
