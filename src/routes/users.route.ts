import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/users.controller";
import asyncWrapper from "../utils/async-wrapper";

const router = Router();

router.get("/", asyncWrapper(getAllUsers));
router.post("/", asyncWrapper(createUser));

export default router;
