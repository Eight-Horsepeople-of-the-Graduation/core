import express, { Router } from "express";
import { listAllLists, createList } from "../controllers/listsController";

const router: Router = express.Router();

router.get("/", listAllLists);
router.post("/", createList);

export default router;
