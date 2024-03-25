import express, { Router } from "express";
import {
  addBookshelf,
  listBooksehlves,
  listBookshelf,
} from "../controllers/bookshelves.controller";

const router: Router = express.Router();

router.get("/", listBooksehlves);
router.get("/bookshelves/:title", listBookshelf);
router.post("/", addBookshelf);

export default router;
