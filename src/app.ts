import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as swaggerUI from "swagger-ui-express";
import loadRouters from "./loaders/express";
import * as swaggerJson from "./swagger/swagger.json";
import config from "./config";
import path from "path";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
import { prismaErrorHandlerMiddleware } from "./middleware/prisma-error-handler.middleware";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";

declare module "express" {
  interface Request {
    user?: any;
  }
}
const app = express();

app.use(cors({ origin: config.origin, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieParser(config.cookieSecret, {
    httpOnly: true,
    signed: true,
  } as any)
);
loadRouters(app);

app.use(
  ["/docs", "/"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.use(prismaErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

export default app;
