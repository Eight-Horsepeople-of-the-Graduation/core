import express, { Router } from "express";
import { listUsers, createUser } from "../controllers/usersController";
import asyncWrapper from "../utils/asyncWrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listUsers));
router.post("/", asyncWrapper(createUser));

export default router;
