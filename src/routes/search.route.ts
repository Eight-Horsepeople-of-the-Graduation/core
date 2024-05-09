import { Router } from "express";
import asyncWrapper from "../utils/async-wrapper";
import searchController from "../controllers/search.controller";

const router = Router();

router.get("/", asyncWrapper(searchController.search));

export default router;
