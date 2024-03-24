import express, { Router } from "express";
import { addBook, listBook, listBooks } from "../controllers/bookController";

const router: Router = express.Router();

router.get("/", listBooks);
router.get("/", listBook);
router.post("/", addBook);

export default router;
