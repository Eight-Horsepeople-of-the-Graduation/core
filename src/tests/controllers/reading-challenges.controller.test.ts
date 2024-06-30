import { Request, Response } from "express";
import readingChallengesController, {
  getReadingChallengeByUserId,
} from "../../controllers/reading-challenges.controller";
import * as readingChallengesService from "../../services/reading-challenges.service";
import { getAllReadingChallenges } from "../../controllers/reading-challenges.controller";
import { ReadingChallengeType } from "@prisma/client";

describe("Reading Challenges Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getAllReadingChallenges", () => {
    it("should handle the case when the service returns null or undefined", async () => {
      const req = {} as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(readingChallengesService, "getAllReadingChallenges")
        .mockResolvedValue([]);

      await getAllReadingChallenges(req, res);

      expect(
        readingChallengesService.getAllReadingChallenges
      ).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([]);
    });

    it("should handle the case when it returns an array of reading challenges", async () => {
      const req = {} as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockReadingChallenges = [
        {
          books: [],
          _count: { books: 0 },
          id: 1,
          title: "Challenge 1",
          userId: 1,
          type: ReadingChallengeType.MONTHLY,
          startDate: new Date(),
          progress: 0,
        },
        {
          books: [],
          _count: { books: 0 },
          id: 2,
          title: "Challenge 2",
          userId: 1,
          type: ReadingChallengeType.ANNUAL,
          startDate: new Date(),
          progress: 42,
        },
      ];

      jest
        .spyOn(readingChallengesService, "getAllReadingChallenges")
        .mockResolvedValue(mockReadingChallenges);

      await getAllReadingChallenges(req, res);

      expect(
        readingChallengesService.getAllReadingChallenges
      ).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(mockReadingChallenges);
    });
  });

  describe("getReadingChallengeById", () => {
    it("should handle the case when the service returns null or undefined", async () => {
      const req = {
        params: {
          id: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(readingChallengesService, "getReadingChallengeById")
        .mockResolvedValue(null);

      await readingChallengesController.getReadingChallengeById(req, res);

      expect(
        readingChallengesService.getReadingChallengeById
      ).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({
        error: "Reading challenges not found",
      });
    });

    it("should handle the case when the service returns a reading challenge", async () => {
      const req = {
        params: {
          id: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;

      const mockReadingChallenge = {
        books: [],
        _count: { books: 0 },
        id: 1,
        title: "Challenge 1",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date(),
        progress: 0,
      };

      jest
        .spyOn(readingChallengesService, "getReadingChallengeById")
        .mockResolvedValue(mockReadingChallenge);

      await readingChallengesController.getReadingChallengeById(req, res);

      expect(
        readingChallengesService.getReadingChallengeById
      ).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockReadingChallenge);
    });
  });

  describe("getReadingChallengeByUserId", () => {
    it("should handle the case when the service returns null or undefined", async () => {
      const req = {
        params: {
          userId: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(readingChallengesService, "getReadingChallengesByUserId")
        .mockResolvedValue([]);

      await readingChallengesController.getReadingChallengeByUserId(req, res);

      expect(
        readingChallengesService.getReadingChallengesByUserId
      ).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith([]);
    });

    it("should return reading challenges when given a valid userId", async () => {
      const req = { params: { userId: "1" } } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;
      const mockReadingChallenges = [
        {
          books: [],
          _count: { books: 0 },
          id: 1,
          title: "Challenge 1",
          userId: 1,
          type: ReadingChallengeType.MONTHLY,
          startDate: new Date(),
          progress: 0,
        },
      ];

      jest
        .spyOn(readingChallengesService, "getReadingChallengesByUserId")
        .mockResolvedValue(mockReadingChallenges);

      await getReadingChallengeByUserId(req, res);

      expect(
        readingChallengesService.getReadingChallengesByUserId
      ).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockReadingChallenges);
    });
  });
});
