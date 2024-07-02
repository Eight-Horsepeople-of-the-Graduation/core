import { ReadingChallengeType } from "@prisma/client";
import {
  addBookToReadingChallenge,
  createReadingChallenge,
  deleteBookFromReadingChallenge,
  deleteReadingChallenge,
  getAllReadingChallenges,
  getReadingChallengeById,
  getReadingChallengesByUserId,
  updateReadingChallenge,
} from "../../repositories/reading-challenges.repository";
import prismaClient from "../../utils/prisma";
import {
  Duration,
  UpdateReadingChallengeDto,
} from "../../dtos/reading-challenges.dto";

describe("ReadingChallengesRepository", () => {
  describe("getAllReadingChallenges", () => {
    it("should return a list of reading challenges with associated books", async () => {
      const mockReadingChallenges = [
        {
          id: 1,
          books: [],
          _count: {
            books: 0,
          },
          title: "Reading Challenge 2",
          startDate: new Date("2021-01-01"),
          progress: 0,
          type: ReadingChallengeType.ANNUAL,
          userId: 1,
        },
      ];

      jest
        .spyOn(prismaClient.readingChallenge, "findMany")
        .mockResolvedValue(mockReadingChallenges);

      const result = await getAllReadingChallenges();

      expect(result).toEqual(mockReadingChallenges);
      expect(result[0].books).toBeDefined();
    });
    it("should return error message if no reading challenges exist", async () => {
      jest
        .spyOn(prismaClient.readingChallenge, "findMany")
        .mockResolvedValue([]);

      try {
        await getAllReadingChallenges();
      } catch (error: unknown) {
        expect((error as Error).message).toBe("No reading challenges found");
      }
    });
  });

  describe("getReadingChallengeById", () => {
    it("should return reading challenge when given a valid id", async () => {
      const mockReadingChallenge = {
        id: 1,
        name: "Test Challenge",
        books: [],
        _count: { books: 0 },
      };

      prismaClient.readingChallenge.findUnique = jest
        .fn()
        .mockResolvedValue(mockReadingChallenge);

      const result = await getReadingChallengeById(1);

      expect(result).toEqual(mockReadingChallenge);
      expect(prismaClient.readingChallenge.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { books: true, _count: { select: { books: true } } },
      });
    });
    it("should return null when given a non-existent id", async () => {
      prismaClient.readingChallenge.findUnique = jest
        .fn()
        .mockResolvedValue(null);

      const result = await getReadingChallengeById(999);

      expect(result).toBeNull();
      expect(prismaClient.readingChallenge.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
        include: { books: true, _count: { select: { books: true } } },
      });
    });
  });

  describe("getReadingChallengesByUserId", () => {
    it("should retrieve reading challenges when userId is valid", async () => {
      const mockUserId = 1;
      const mockReadingChallenges = [
        { id: 1, userId: mockUserId, books: [], _count: { books: 0 } },
        { id: 2, userId: mockUserId, books: [], _count: { books: 0 } },
      ];

      prismaClient.readingChallenge.findMany = jest
        .fn()
        .mockResolvedValue(mockReadingChallenges);

      const result = await getReadingChallengesByUserId(mockUserId);

      expect(prismaClient.readingChallenge.findMany).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: { books: true, _count: { select: { books: true } } },
      });
      expect(result).toEqual(mockReadingChallenges);
    });
    it("should return an empty array when userId does not exist", async () => {
      const nonExistentUserId = 999;

      prismaClient.readingChallenge.findMany = jest.fn().mockResolvedValue([]);

      const result = await getReadingChallengesByUserId(nonExistentUserId);

      expect(prismaClient.readingChallenge.findMany).toHaveBeenCalledWith({
        where: { userId: nonExistentUserId },
        include: { books: true, _count: { select: { books: true } } },
      });
      expect(result).toEqual([]);
    });
  });
  describe("addBookToReadingChallenge", () => {
    it("should successfully add a book to an existing reading challenge", async () => {
      const mockReadingChallengeId = 1;
      const mockBookId = 1;
      const mockUpdatedReadingChallenge = {
        id: mockReadingChallengeId,
        books: [{ id: mockBookId }],
      };

      prismaClient.readingChallenge.update = jest
        .fn()
        .mockResolvedValue(mockUpdatedReadingChallenge);

      const result = await addBookToReadingChallenge(
        mockReadingChallengeId,
        mockBookId
      );

      expect(prismaClient.readingChallenge.update).toHaveBeenCalledWith({
        where: { id: mockReadingChallengeId },
        data: { books: { connect: { id: mockBookId } } },
        include: { books: true },
      });

      expect(result).toEqual(mockUpdatedReadingChallenge);
    });
    it("should throw an error when reading challenge ID does not exist", async () => {
      const mockReadingChallengeId = 999;
      const mockBookId = 1;

      prismaClient.readingChallenge.update = jest
        .fn()
        .mockRejectedValue(new Error("Reading challenge not found"));

      await expect(
        addBookToReadingChallenge(mockReadingChallengeId, mockBookId)
      ).rejects.toThrow("Reading challenge not found");

      expect(prismaClient.readingChallenge.update).toHaveBeenCalledWith({
        where: { id: mockReadingChallengeId },
        data: { books: { connect: { id: mockBookId } } },
        include: { books: true },
      });
    });
  });
  describe("createReadingChallenge", () => {
    it("should create a reading challenge when provided with valid data", async () => {
      const mockReadingChallengeData = {
        title: "Read 10 Books",
        type: Duration.ANNUAL,
        userId: 1,
        progress: 0,
        startDate: new Date(),
        books: [],
        _count: {
          books: 0,
        },
      };

      prismaClient.readingChallenge.create = jest
        .fn()
        .mockResolvedValue(mockReadingChallengeData);

      const result = await createReadingChallenge(mockReadingChallengeData);

      expect(prismaClient.readingChallenge.create).toHaveBeenCalledWith({
        data: mockReadingChallengeData,
      });
      expect(result).toEqual(mockReadingChallengeData);
    });
    it("should throw an error when required fields are missing", async () => {
      const mockReadingChallengeData = {
        title: "",
        type: Duration.ANNUAL,
        userId: 1,
        progress: 0,
        startDate: new Date(),
      };

      prismaClient.readingChallenge.create = jest
        .fn()
        .mockImplementation(() => {
          throw new Error("Validation error");
        });

      await expect(
        createReadingChallenge(mockReadingChallengeData)
      ).rejects.toThrow("Validation error");
    });
  });
  describe("updateReadingChallenge", () => {
    it("should update the reading challenge when given valid data", async () => {
      const moclekItem = {
        id: 1,
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
        userId: 1,
        startDate: new Date("2021-01-01"),
      };
      const mockUpdate = jest
        .spyOn(prismaClient.readingChallenge, "update")
        .mockResolvedValue(moclekItem);

      const updatedData: UpdateReadingChallengeDto = {
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
      };
      const result = await updateReadingChallenge(1, updatedData);

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedData,
      });
      expect(result).toEqual({
        id: 1,
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
        userId: 1,
        startDate: new Date("2021-01-01"),
      });

      mockUpdate.mockRestore();
    });
    it("should throw an error when trying to update a non-existent reading challenge", async () => {
      const mockUpdate = jest
        .spyOn(prismaClient.readingChallenge, "update")
        .mockRejectedValue(new Error("Reading Challenge not found"));

      const updatedData = {
        id: 1,
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
        userId: 1,
        startDate: new Date(),
      };

      await expect(updateReadingChallenge(999, updatedData)).rejects.toThrow(
        "Reading Challenge not found"
      );

      mockUpdate.mockRestore();
    });
  });

  describe("deleteBookFromReadingChallenge", () => {
    it("should remove a book from the reading challenge when valid IDs are provided", async () => {
      const readingChallengeId = 1;
      const bookId = 1;

      const mockUpdatedReadingChallenge = {
        id: readingChallengeId,
        books: [],
      };

      prismaClient.readingChallenge.update = jest
        .fn()
        .mockResolvedValue(mockUpdatedReadingChallenge);

      const result = await deleteBookFromReadingChallenge(
        readingChallengeId,
        bookId
      );

      expect(prismaClient.readingChallenge.update).toHaveBeenCalledWith({
        where: { id: readingChallengeId },
        data: { books: { disconnect: { id: bookId } } },
        include: { books: true },
      });

      expect(result).toEqual(mockUpdatedReadingChallenge);
    });
    // Book ID does not exist in the reading challenge
    it("should not remove a book when the book ID does not exist in the reading challenge", async () => {
      const readingChallengeId = 1;
      const bookId = 2;

      const mockUpdatedReadingChallenge = {
        id: readingChallengeId,
        books: [],
      };

      prismaClient.readingChallenge.update = jest
        .fn()
        .mockResolvedValue(mockUpdatedReadingChallenge);

      const result = await deleteBookFromReadingChallenge(
        readingChallengeId,
        bookId
      );

      expect(prismaClient.readingChallenge.update).toHaveBeenCalledWith({
        where: { id: readingChallengeId },
        data: { books: { disconnect: { id: bookId } } },
        include: { books: true },
      });

      expect(result).toEqual(mockUpdatedReadingChallenge);
    });
  });
  describe("deleteReadingChallenge", () => {
    it("should delete a reading challenge when given a valid ID", async () => {
      const mockData = {
        id: 1,
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
        userId: 1,
        startDate: new Date("2021-01-01"),
      };
      const mockDelete = jest
        .spyOn(prismaClient.readingChallenge, "delete")
        .mockResolvedValue(mockData);
      const result = await deleteReadingChallenge(1);
      expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({
        id: 1,
        title: "Updated Title",
        progress: 50,
        type: Duration.MONTHLY,
        userId: 1,
        startDate: new Date("2021-01-01"),
      });
      mockDelete.mockRestore();
    });
    it("should throw an error when trying to delete a non-existent reading challenge", async () => {
      const mockDelete = jest
        .spyOn(prismaClient.readingChallenge, "delete")
        .mockRejectedValue(new Error("Reading challenge not found"));
      await expect(deleteReadingChallenge(999)).rejects.toThrow(
        "Reading challenge not found"
      );
      expect(mockDelete).toHaveBeenCalledWith({ where: { id: 999 } });
      mockDelete.mockRestore();
    });
  });
});
