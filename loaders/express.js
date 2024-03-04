const usersRouter = require("../routes/users");

module.exports = (app) => {
  app.use("/users", usersRouter);
};
