import { Express } from "express";
import listsRouter from "../routes/lists.route";
import readingChallengesRouter from "../routes/reading-challenges.route";
import usersRouter from "../routes/users.route";

/**
 * Registers all routes in the application
 * @param app - The Express application
 * @returns void
 */
export default (app: Express) => {
  app.use("/lists", listsRouter);
  app.use("/reading-challenges", readingChallengesRouter);
  app.use("/users", usersRouter);
};
