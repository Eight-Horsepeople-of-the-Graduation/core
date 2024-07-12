import express from "express";
import * as swaggerUI from "swagger-ui-express";
import config from "./config";
import { errorHandlerMiddleware } from "@common/middleware/error-handler.middleware";
import * as swaggerJson from "@common/swagger/swagger.json";
import logger from "@common/utils/logger";
import { prismaErrorHandlerMiddleware } from "@common/middleware/prisma-error-handler.middleware";
import loadRouters from "@loaders/routes.loader";
import loadMainMiddleware from "@loaders/middleware.loader";

/**
 * Starts the server by loading the main middleware and routers
 * and listening on the specified port in the config file (default is 3000)
 * @returns void
 */
const startServer = async () => {
  const app = express();
  const port = config.port;

  loadMainMiddleware(app);
  loadRouters(app);

  app.use(["/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

  app.use(prismaErrorHandlerMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
    logger.info(`See Docs at http://localhost:${port}/docs`);
  });
};

startServer();
