const express = require("express");

const readingChallengesController = require("../controllers/readingChallengesController");

const router = express.Router();

router.get("/", readingChallengesController.listReadingChallenges);
router.post("/", readingChallengesController.createReadingChallenge);

module.exports = router;
