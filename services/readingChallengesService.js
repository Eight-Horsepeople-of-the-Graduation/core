const prisma = require("../utils/prisma");

const getReadingChallenges = async () => {
  const readingChallenges = await prisma.readingChallenge.findMany();
  return readingChallenges;
};

const createReadingChallenge = async (readingChallengeData) => {
  const { title, type, numOfBooks, progress } = readingChallengeData;

  const readingChallenge = await prisma.readingChallenge.create({
    data: {
      title,
      type,
      numOfBooks,
      progress,
    },
  });
  return readingChallenge;
};

module.exports = {
  getReadingChallenges,
  createReadingChallenge,
};
