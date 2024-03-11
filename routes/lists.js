const express = require("express");

const router = express.Router();

const listsController = require("../controllers/listsController");

router.get("/", listsController.listAllLists);
router.post("/", listsController.createList);

module.exports = router;
