import prisma from "../utils/prisma";

export const getReadingChallenges = async () => {
  const readingChallenges = await prisma.readingChallenge.findMany();

  return readingChallenges;
};

export const createReadingChallenge = async (readingChallengeData: {
  title: any;
  type: "ANNUAL" | "MONTHLY" | "WEEKLY";
  userId: any;
  numOfBooks: any;
  progress: any;
}) => {
  const { title, type, userId, numOfBooks, progress } = readingChallengeData;

  const readingChallenge = await prisma.readingChallenge.create({
    data: {
      title,
      type,
      userId,
      progress,
    },
  });

  return readingChallenge;
};
