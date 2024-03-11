const readingChallengesService = require("../services/readingChallengesService");

const listReadingChallenges = async (req, res) => {
  const readingChallenges =
    await readingChallengesService.getReadingChallenges();

  return res.send(readingChallenges);
};

const createReadingChallenge = async (req, res) => {
  const readingChallengeData = req.body;

  const readingChallenge =
    await readingChallengesService.createReadingChallenge(readingChallengeData);

  return res.send(readingChallenge);
};

module.exports = {
  listReadingChallenges,
  createReadingChallenge,
};