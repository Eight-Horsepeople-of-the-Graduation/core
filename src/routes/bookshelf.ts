import express, { Router } from "express";
import {
  addBookshelf,
  listBooksehlves,
  listBookshelf,
} from "../controllers/bookshelfController";

const router: Router = express.Router();

router.get("/", listBooksehlves);
router.get("/bookshelves/:title", listBookshelf);
router.post("/", addBookshelf);

export default router;
