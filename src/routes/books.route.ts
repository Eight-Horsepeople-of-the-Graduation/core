import { Router } from "express";
import {
  createBook,
  //getBook,
  getAllBooks,
  //updateBook,
  //deleteBook,
} from "../controllers/books.controller";

const router = Router();

router.get("/", getAllBooks);
//router.get("/:title", getBook);
router.post("/", createBook);
//router.put("/:id,", updateBook);
//router.delete("/:id", deleteBook);

export default router;
