import express, { Router } from "express";
import { listUsers, createUser } from "../controllers/usersController";

const router: Router = express.Router();

router.get("/", listUsers);
router.post("/", createUser);

export default router;
