import express from "express";
import config from "./config";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import loadRouters from "@loaders/express";

/**
 * Starts the server
 * @returns void
 */
const startServer = async () => {
  const app = express();
  const port = config.port;

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  loadRouters(app);

  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();
