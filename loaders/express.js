const usersRouter = require("../routes/users");
const readingChallengesRouter = require("../routes/readingChallenges");

module.exports = (app) => {
  app.use("/users", usersRouter);
  app.use("/readingchallenges", readingChallengesRouter);
};
