const express = require("express");
const loadRouters = require("./loaders/express");

const config = require("./config");

const startServer = async () => {
  const app = express();
  const port = config.port;

  loadRouters(app);

  app.use(express.json());
  //   app.use(express.urlencoded({ extended: true }));

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();