import express, { Router } from "express";
import { listAllLists, createList } from "../controllers/lists-controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listAllLists));
router.post("/", asyncWrapper(createList));

export default router;
