import express, { Router } from "express";
import {
  addBookshelf,
  listBooksehlves,
  listBookshelf,
  listManyBookshelves,
} from "../controllers/bookshelves.controller";

const router: Router = express.Router();

router.get("/", listBooksehlves);
router.get("/find", listBookshelf);
router.get("/findMany", listManyBookshelves);
router.post("/", addBookshelf);

export default router;
