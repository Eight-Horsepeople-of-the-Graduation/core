import express, { Router } from "express";
import { listUsers, createUser } from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";

const router: Router = express.Router();

router.get("/", asyncWrapper(listUsers));
router.post("/", asyncWrapper(createUser));

export default router;
