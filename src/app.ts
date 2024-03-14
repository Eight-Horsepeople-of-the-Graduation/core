import express from "express";
import loadRouters from "./loaders/express";
import config from "./config";
import morgan from "morgan";

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

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();
