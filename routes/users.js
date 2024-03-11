const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.listUsers);
router.post("/", usersController.createUser);

module.exports = router;