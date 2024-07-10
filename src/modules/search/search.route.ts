import asyncWrapper from "@common/utils/async-wrapper";
import searchController from "@modules/search/search.controller";
import { Router } from "express";

const router = Router();

router.get("/", asyncWrapper(searchController.search));

export default router;
