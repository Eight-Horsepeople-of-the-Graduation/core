import { Router } from "express";
import {
  createBook,
  getBook,
  getAllBooks,
} from "../controllers/books.controller";

const router = Router();

router.get("/", getAllBooks);
router.get("/:title", getBook);
router.post("/", createBook);

export default router;
