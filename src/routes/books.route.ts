import express, { Router } from "express";
import { addBook, listBook, listBooks } from "../controllers/books.controller";

const router: Router = express.Router();

router.get("/", listBooks);
router.get("/:title", listBook);
router.post("/", addBook);

export default router;
