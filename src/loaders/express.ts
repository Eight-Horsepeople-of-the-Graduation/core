import { Express } from "express";
import authRouter from "@modules/auth/auth.route";
import readingChallengesRouter from "@modules/reading-challenges/reading-challenges.route";
import usersRouter from "@modules/users/users.route";
import booksRouter from "../modules/books/books.route";
import bookshelfRouter from "@modules/bookshelves/bookshelves.route";
import searchRouter from "@modules/search/search.route";
import conversationsRouter from "@modules/conversations/conversations.route";
import authorsRouter from "@modules/authors/authors.route";
import genresRouter from "@modules/genres/genres.route";
import reviewsRouter from "@modules/reviews/reviews.route";

/**
 * Registers all routes in the application
 * @param app - The Express application
 * @returns void
 */
const loadRouters = (app: Express) => {
  app.use("/auth", authRouter);
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
