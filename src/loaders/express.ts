import { Express } from "express";
import listsRouter from "../routes/lists";
import readingChallengesRouter from "../routes/readingChallenges";
import usersRouter from "../routes/users";
import booksRouter from "../routes/books";
import bookshelfRouter from "../routes/books";

/**
 * Registers all routes in the application
 * @param app - The Express application
 * @returns void
 */
export default (app: Express) => {
  app.use("/lists", listsRouter);
  app.use("/reading-challenges", readingChallengesRouter);
  app.use("/users", usersRouter);
  app.use("/books", booksRouter);
  app.use("/bookshelf", bookshelfRouter);
};
