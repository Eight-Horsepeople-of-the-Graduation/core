const usersRouter = require("../routes/users");
const readingChallengesRouter = require("../routes/readingChallenges");
const listsRouter = require("../routes/lists");

module.exports = (app) => {
  app.use("/users", usersRouter);
  app.use("/readingchallenges", readingChallengesRouter);
  app.use("/lists", listsRouter);
};
