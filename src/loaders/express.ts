import { Express } from "express";
import readingChallengesRouter from "@routes/reading-challenges.route";
import usersRouter from "@routes/users.route";
import booksRouter from "@routes/books.route";
import bookshelfRouter from "@routes/bookshelves.route";
import searchRouter from "@routes/search.route";
import conversationsRouter from "@routes/conversations.route";
import authorsRouter from "@routes/authors.route";
import genresRouter from "@routes/genres.route";
import reviewsRouter from "@routes/reviews.route";

/**
 * Registers all routes in the application
 * @param app - The Express application
 * @returns void
 */
const loadRouters = (app: Express) => {
  app.use("/books", booksRouter);
  app.use("/bookshelves", bookshelfRouter);
  app.use("/reading-challenges", readingChallengesRouter);
  app.use("/search", searchRouter);
  app.use("/users", usersRouter);
  app.use("/conversations", conversationsRouter);
  app.use("/reviews", reviewsRouter);
  app.use("/authors", authorsRouter);
  app.use("/genres", genresRouter);
};

export default loadRouters;
