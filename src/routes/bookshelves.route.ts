import { Router } from "express";
import {
  createBookshelf,
  getAllBookshelves,
  getBookshelf,
} from "../controllers/bookshelves.controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = Router();

router.get("/", asyncWrapper(getAllBookshelves));
router.get("/bookshelves/:title", asyncWrapper(getBookshelf));
router.post("/", asyncWrapper(createBookshelf));

export default router;
