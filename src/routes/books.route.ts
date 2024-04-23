import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/books.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(getAllBooks));
router.post("/", asyncWrapper(createBook));

export default router;
