import { Express } from "express";
import readingChallengesRouter from "../routes/reading-challenges.route";
import usersRouter from "../routes/users.route";
import booksRouter from "../routes/books.route";
import bookshelfRouter from "../routes/bookshelves.route";

/**
 * Registers all routes in the application
 * @param app - The Express application
 * @returns void
 */
export default (app: Express) => {
  app.use("/books", booksRouter);
  app.use("/bookshelves", bookshelfRouter);
  app.use("/reading-challenges", readingChallengesRouter);
  app.use("/users", usersRouter);
};
