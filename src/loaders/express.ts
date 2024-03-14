import { Express } from "express";
import listsRouter from "../routes/lists";
import readingChallengesRouter from "../routes/readingChallenges";
import usersRouter from "../routes/users";

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
