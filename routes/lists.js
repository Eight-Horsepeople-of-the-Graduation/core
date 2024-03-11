const express = require("express");

const listsController = require("../controllers/listsController");

router.get("/", listsController.listAllLists);
router.post("/", listsController.createList);