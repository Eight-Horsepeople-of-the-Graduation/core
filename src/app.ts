import express from "express";
import morgan from "morgan";
import * as swaggerUI from "swagger-ui-express";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import loadRouters from "./loaders/express";
import * as swaggerJson from "./swagger/swagger.json";
import path from "path";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loadRouters(app);

app.use(
  ["/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.use("/",(req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.use(errorHandlerMiddleware);

export default app;

