import express, { Router } from "express";
import {
  addBook,
  listBook,
  listBooks,
  listManyBooks,
} from "../controllers/books.controller";

const router: Router = express.Router();

router.get("/", listBooks);
router.get("/find", listBook);
router.get("/findMany", listManyBooks);
router.post("/", addBook);

export default router;
