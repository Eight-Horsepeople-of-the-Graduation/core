import readingChallengesRepository from "@modules/reading-challenges/reading-challenges.repository";
import prismaClient from "@common/utils/prisma";
import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";
import { Format } from "@modules/books/book-format.enum";

describe("Reading Challenges Repository Integration Tests", () => {
  beforeAll(async () => {
    await prismaClient.book.create({
      data: {
        title: "Test Book",
        isbn: "0802124739",
        description: "This is a test book",
        publishDate: new Date(),
        format: Format.HARDCOVER,
        language: "English",
        country: "United States",
        numOfPages: 100,
        authors: {
          create: {
            name: "Test Author",
          },
        },
      },
    });
    await prismaClient.user.create({
      data: {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: "MALE",
      },
    });

    const validUserId = await getValidUserId();
    await prismaClient.readingChallenge.createMany({
      data: [
        {
          title: "Test Reading Challenge 1",
          startDate: new Date("2021-01-01"),
          endDate: new Date("2021-12-31"),
          type: Duration.ANNUAL,
          goal: 12,
          userId: Number(validUserId),
          timeframe: "2021",
        },
        {
          title: "Test Reading Challenge 2",
          startDate: new Date("2021-01-01"),
          endDate: new Date("2021-12-31"),
          type: Duration.ANNUAL,
          goal: 12,
          userId: Number(validUserId),
          timeframe: "2021",
        },
      ],
    });
  }, 20000);

  afterAll(async () => {
    await prismaClient.readingChallenge.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.book.deleteMany();
    await prismaClient.author.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "ReadingChallenge_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;

    await prismaClient.$disconnect();
  }, 20000);
  const getValidUserId = async () => {
    const user = await prismaClient.user.findFirst();
    return user.id;
  };
  it("should create a new reading challenge", async () => {
    const userId = await getValidUserId();

    const newReadingChallenge = {
      title: "New Reading Challenge",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-12-31"),
      type: Duration.ANNUAL,
      goal: 12,
      userId: Number(userId),
      timeframe: "2021",
    };

    const readingChallenge =
      await readingChallengesRepository.createReadingChallenge(
        newReadingChallenge
      );

    const addedReadingChallenge = await prismaClient.readingChallenge.findFirst(
      {
        where: { title: "New Reading Challenge" },
      }
    );

    expect(readingChallenge).toMatchObject(addedReadingChallenge);
  }, 20000);

  it("should get all reading challenges for a user", async () => {
    const readingChallenges =
      await readingChallengesRepository.getAllReadingChallenges();

    const newReadingChallenge = await prismaClient.readingChallenge.findMany();

    expect(readingChallenges).toHaveLength(newReadingChallenge.length);
  }, 20000);

  it("should get reading challenges by user id", async () => {
    const userId = 1;

    const readingChallenges =
      await readingChallengesRepository.getReadingChallengesByUserId(userId);

    const newReadingChallenge = await prismaClient.readingChallenge.findMany({
      where: { userId },
    });

    expect(readingChallenges).toHaveLength(newReadingChallenge.length);
  }, 20000);

  it("should get reading challenge by id", async () => {
    const readingChallenge =
      await readingChallengesRepository.getReadingChallengeById(1);

    const newReadingChallenge = await prismaClient.readingChallenge.findUnique({
      where: { id: 1 },
      include: {
        books: true,
      },
    });

    expect(readingChallenge).toEqual(newReadingChallenge);
  }, 20000);

  it("should update reading challenge", async () => {
    const updatedReadingChallenge = {
      title: "Updated Reading Challenge",
      goal: 14,
    };
    const getValidReadingChallengeId = async () => {
      const readingChallenge = await prismaClient.readingChallenge.findFirst();
      return readingChallenge.id;
    };
    const readingChallengeId = await getValidReadingChallengeId();

    await readingChallengesRepository.updateReadingChallengeDetails(
      readingChallengeId,
      updatedReadingChallenge
    );
    const readingChallenge = await prismaClient.readingChallenge.findUnique({
      where: { id: readingChallengeId },
    });
    expect(readingChallenge.title).toBe("Updated Reading Challenge");
  }, 20000);

  it("should delete reading challenge", async () => {
    const getValidReadingChallengeId = async () => {
      const readingChallenge = await prismaClient.readingChallenge.findFirst();
      return readingChallenge.id;
    };
    const readingChallengeId = await getValidReadingChallengeId();

    await readingChallengesRepository.deleteReadingChallenge(
      readingChallengeId
    );

    const deletedReadingChallenge =
      await prismaClient.readingChallenge.findUnique({
        where: { id: readingChallengeId },
      });

    expect(deletedReadingChallenge).toBeNull();
  }, 20000);

  it("should add a book to reading challenge", async () => {
    const getValidReadingChallengeId = async () => {
      const readingChallenge = await prismaClient.readingChallenge.findFirst();
      return readingChallenge.id;
    };
    const getValidBookId = async () => {
      const book = await prismaClient.book.findFirst();
      return book.id;
    };
    const readingChallengeId = await getValidReadingChallengeId();

    const bookId = await getValidBookId();
    console.log(bookId);
    await readingChallengesRepository.addBookToUserReadingChallenges(
      readingChallengeId,
      bookId
    );

    const readingChallenge = await prismaClient.readingChallenge.findUnique({
      where: { id: readingChallengeId },
      include: {
        books: {
          select: {
            id: true,
          },
        },
      },
    });

    expect(readingChallenge).toHaveProperty("books");
  }, 20000);

  it("should remove a book from reading challenge", async () => {
    const getValidReadingChallengeId = async () => {
      const readingChallenge = await prismaClient.readingChallenge.findFirst();
      return readingChallenge.id;
    };
    const getValidBookId = async () => {
      const book = await prismaClient.book.findFirst();
      return book.id;
    };
    const readingChallengeId = await getValidReadingChallengeId();

    const bookId = await getValidBookId();

    await readingChallengesRepository.addBookToUserReadingChallenges(
      readingChallengeId,
      bookId
    );

    await readingChallengesRepository.deleteBookFromUserReadingChallenges(
      readingChallengeId,
      bookId
    );

    const readingChallenge = await prismaClient.readingChallenge.findUnique({
      where: { id: readingChallengeId },
      include: {
        books: {
          select: {
            id: true,
          },
        },
      },
    });

    expect(readingChallenge).toHaveProperty("books");
  }, 20000);
  it("should get all active reading challenges by type", async () => {
    const userId = await getValidUserId();
    const readingChallenge =
      await readingChallengesRepository.getActiveReadingChallengeByType(
        Duration.ANNUAL,
        userId
      );

    expect(readingChallenge).toHaveProperty("type", Duration.ANNUAL);
  }, 20000);
});
