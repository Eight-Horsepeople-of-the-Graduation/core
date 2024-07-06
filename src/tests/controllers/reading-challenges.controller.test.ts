import { Request, Response } from "express";
import {
  addBookToReadingChallenge,
  createReadingChallenge,
  deleteBookFromReadingChallenge,
  deleteReadingChallenge,
  getReadingChallengeById,
  getReadingChallengeByUserId,
  updateReadingChallenge,
} from "../../controllers/reading-challenges.controller";
import * as readingChallengesService from "../../services/reading-challenges.service";
import { getAllReadingChallenges } from "../../controllers/reading-challenges.controller";
import { ReadingChallengeType } from "@prisma/client";
import { Format } from "@prisma/client";

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

      await getReadingChallengeById(req, res);

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

      await getReadingChallengeById(req, res);

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

      await getReadingChallengeByUserId(req, res);

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
  describe("addBookToReadingChallenge", () => {
    it("should successfully add a book to an existing reading challenge when valid id and bookId are provided", async () => {
      const req = {
        params: { id: "1" },
        body: { bookId: 2 },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const mockUpdatedReadingChallenge = {
        id: 1,
        books: [
          {
            id: 2,
            title: "Book Title",
            isbn: "1234567890",
            description: "Book Description",
            publishDate: new Date(),
            format: Format.HARDCOVER,
            language: "English",
            country: "United States",
            numOfPages: 200,
            pdfLink: null,
            coverPicture: null,
          },
        ],
        title: "Challenge 1",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date(),
        progress: 0,
      };
      jest
        .spyOn(readingChallengesService, "addBookToReadingChallenge")
        .mockResolvedValue(mockUpdatedReadingChallenge);

      await addBookToReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUpdatedReadingChallenge);
    });
    it("should return an error when bookId is missing in request body", async () => {
      const req = {
        params: { id: "1" },
        body: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await addBookToReadingChallenge(req, res);

      expect(res.send).toHaveBeenCalledWith({ error: "Book ID is required" });
    });
  });

  describe("createReadingChallenge", () => {
    it("should create a reading challenge when valid data is provided", async () => {
      const req = {
        body: {
          title: "New Challenge",
          description: "Read 10 books in 2023",
          userId: 1,
          type: ReadingChallengeType.MONTHLY,
          startDate: new Date(),
          progress: 0,
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createdReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 10 books in 2023",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date(),
        progress: 0,
      };

      jest
        .spyOn(readingChallengesService, "createReadingChallenge")
        .mockResolvedValue(createdReadingChallenge);

      await createReadingChallenge(req, res);

      expect(res.send).toHaveBeenCalledWith(createdReadingChallenge);
    });
    it("should return 400 error when request body is missing", async () => {
      const req = {
        body: null,
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await createReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: "Missing required fields",
      });
    });
  });
  describe("updateReadingChallenge", () => {
    it("should update the reading challenge when valid id and data are provided", async () => {
      const req = {
        params: { id: "1" },
        body: { title: "Updated Challenge" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      const updatedReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 10 books in 2023",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date(),
        progress: 0,
      };
      jest
        .spyOn(readingChallengesService, "updateReadingChallenge")
        .mockResolvedValue(updatedReadingChallenge);

      await updateReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(updatedReadingChallenge);
    });

    it("should return 400 error when id is missing in request params", async () => {
      const req = {
        params: {},
        body: { title: "Updated Challenge" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await updateReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Updating Reading Callenge Error : Missing Id",
      });
    });
  });

  describe("deleteBookFromReadingChallenge", () => {
    it("should delete a book from an existing reading challenge when valid IDs are provided", async () => {
      const req = {
        params: { id: "1" },
        body: { bookId: 1 },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const mockDeleteBookFromReadingChallenge = jest
        .spyOn(readingChallengesService, "deleteBookFromReadingChallenge")
        .mockResolvedValue({
          books: [],
          id: 1,
          title: "Challenge 1",
          userId: 1,
          type: ReadingChallengeType.MONTHLY,
          startDate: new Date("2023-01-01"),
          progress: 0,
        });

      await deleteBookFromReadingChallenge(req, res);

      expect(mockDeleteBookFromReadingChallenge).toHaveBeenCalledWith(1, 1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        books: [],
        id: 1,
        title: "Challenge 1",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date("2023-01-01"),
        progress: 0,
      });
    });
    // Book ID is missing or invalid
    it("should return status 400 with error message when book ID is missing", async () => {
      const req = {
        params: { id: "1" },
        body: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await deleteBookFromReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: "Book ID is required" });
    });
  });
  describe("deleteReadingChallenge", () => {
    it("should delete a reading challenge when a valid id is provided", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const deletedReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 10 books in 2023",
        userId: 1,
        type: ReadingChallengeType.MONTHLY,
        startDate: new Date(),
        progress: 0,
      };

      jest
        .spyOn(readingChallengesService, "deleteReadingChallenge")
        .mockResolvedValue(deletedReadingChallenge);

      await deleteReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(deletedReadingChallenge);
    });

    it("should return status 400 when id is missing in request params", async () => {
      const req = { params: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await deleteReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Deleting Reading Callenge Error( Missing field: id ) ",
      });
    });
  });
});
