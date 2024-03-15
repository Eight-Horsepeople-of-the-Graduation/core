import express, { Router } from "express";
import { listAllLists, createList } from "../controllers/listsController";
import asyncWrapper from "../utils/asyncWrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listAllLists));
router.post("/", asyncWrapper(createList));

export default router;
