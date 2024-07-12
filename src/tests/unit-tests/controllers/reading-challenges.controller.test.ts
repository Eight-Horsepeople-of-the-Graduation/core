import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import { IReadingChallengeWithBooks } from "@common/interfaces/reading-challenges.interface";
import { Format } from "@modules/books/dtos/books.dto";
import {
  addBookToUserReadingChallenges,
  createReadingChallenge,
  deleteBookFromReadingChallenge,
  deleteReadingChallenge,
  getAllReadingChallenges,
  getReadingChallengeById,
  updateReadingChallengeDetails,
} from "@modules/reading-challenges/reading-challenges.controller";
import readingChallengesService from "@modules/reading-challenges/reading-challenges.service";
import { ReadingChallengeType } from "@prisma/client";
import { Request, Response } from "express";

describe("Reading Challenges Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getAllReadingChallenges", () => {
    // Successfully retrieves all reading challenges
    it("should return all reading challenges when they exist", async () => {
      const req = {} as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockReadingChallenges = [
        {
          books: [] as any[],
          _count: { books: 1 },
          id: 1,
          title: "Challenge 1",
          userId: 1,
          type: ReadingChallengeType.MONTHLY,
          startDate: new Date("2023-01-01"),
          progress: 0,
          endDate: new Date("2023-04-01"),
          goal: 25,
          timeframe: "3 months",
          hasEnded: false,
        },
        {
          books: [] as any[],
          _count: { books: 0 },
          id: 2,
          title: "Challenge 2",
          userId: 1,
          type: ReadingChallengeType.ANNUAL,
          startDate: new Date("2023-01-01"),
          progress: 42,
          endDate: new Date("2023-04-01"),
          goal: 45,
          timeframe: "4 months",
          hasEnded: false,
        },
      ];

      jest
        .spyOn(readingChallengesService, "getAllReadingChallenges")
        .mockResolvedValue(mockReadingChallenges);

      await getAllReadingChallenges(req, res);

      expect(res.send).toHaveBeenCalledWith(mockReadingChallenges);
    });

    it("should return an empty array when no reading challenges are available", async () => {
      const req = {} as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(readingChallengesService, "getAllReadingChallenges")
        .mockResolvedValue([]);

      await getAllReadingChallenges(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
    });
  });
  describe("getReadingChallengeById", () => {
    // Successfully retrieves a reading challenge by a valid ID
    it("should return reading challenge when valid ID is provided", async () => {
      const req = {
        params: {
          readingChallengeId: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const readingChallenge = {
        books: [] as any[],
        _count: { books: 0 },
        id: 2,
        title: "Challenge 2",
        userId: 1,
        type: ReadingChallengeType.ANNUAL,
        startDate: new Date("2023-01-01"),
        progress: 42,
        endDate: new Date("2023-04-01"),
        goal: 45,
        timeframe: "4 months",
        hasEnded: false,
      };
      jest
        .spyOn(readingChallengesService, "getReadingChallengeById")
        .mockResolvedValue(readingChallenge);

      await getReadingChallengeById(req, res);

      expect(
        readingChallengesService.getReadingChallengeById
      ).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(readingChallenge);
    });
    it("should throw HttpException when reading challenge ID is missing", async () => {
      const req = {
        params: {},
      } as unknown as Request;
      const res = {} as Response;

      await expect(getReadingChallengeById(req, res)).rejects.toThrow(
        HttpException
      );
      await expect(getReadingChallengeById(req, res)).rejects.toThrow(
        "Missing required field: readingChallengeId"
      );
    });
  });

  describe("addBookToReadingChallenge", () => {
    // Successfully adds a book to a user's reading challenges when valid userId and bookId are provided
    it("should add a book to user's reading challenges when valid userId and bookId are provided", async () => {
      const req = {
        params: {
          userId: "1",
          bookId: "101",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockUpdatedReadingChallenges = [
        {
          books: [] as any[],
          _count: { books: 0 },
          id: 2,
          title: "Challenge 2",
          userId: 1,
          type: ReadingChallengeType.ANNUAL,
          startDate: new Date("2023-01-01"),
          progress: 42,
          endDate: new Date("2023-04-01"),
          goal: 45,
          timeframe: "4 months",
          hasEnded: false,
        },
      ];
      jest
        .spyOn(readingChallengesService, "addBookToUserReadingChallenges")
        .mockResolvedValue(mockUpdatedReadingChallenges);

      await addBookToUserReadingChallenges(req, res);

      expect(
        readingChallengesService.addBookToUserReadingChallenges
      ).toHaveBeenCalledWith(1, 101);
      expect(res.send).toHaveBeenCalledWith(mockUpdatedReadingChallenges);
    });

    it("should throw an exception when userId is missing from request parameters", async () => {
      const req = {
        params: {
          bookId: "101",
        },
      } as unknown as Request;
      const res = {} as Response;

      await expect(addBookToUserReadingChallenges(req, res)).rejects.toThrow(
        HttpException
      );
      await expect(addBookToUserReadingChallenges(req, res)).rejects.toThrow(
        "Missing required field: userId"
      );
    });
  });

  describe("createReadingChallenge", () => {
    // Successfully create a reading challenge with valid data
    it("should create a reading challenge when valid data is provided", async () => {
      const req = {
        body: {
          title: "New Challenge",
          description: "Read 5 books in a month",
          startDate: "2023-01-01",
          endDate: "2023-01-31",
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createdReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 5 books in a month",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
        type: ReadingChallengeType.MONTHLY,
        goal: 5,
        userId: 1,
        progress: 0,
        timeframe: "1 month",
        hasEnded: false,
      };

      jest
        .spyOn(readingChallengesService, "createReadingChallenge")
        .mockResolvedValue(createdReadingChallenge);

      await createReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(createdReadingChallenge);
    });
    // Handle invalid data types in request body
    it("should handle invalid data types in request body", async () => {
      const req = {
        body: "invalidData",
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(readingChallengesService, "createReadingChallenge")
        .mockImplementation(() => {
          throw new Error("Invalid data types in request body");
        });

      await expect(createReadingChallenge(req, res)).rejects.toThrow(
        "Invalid data types in request body"
      );
    });
  });
  describe("updateReadingChallenge", () => {
    // Successfully updates reading challenge details with valid ID and data
    it("should update reading challenge details when valid ID and data are provided", async () => {
      const req = {
        params: { readingChallengeId: "1" },
        body: { title: "New Title" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 5 books in a month",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
        type: ReadingChallengeType.MONTHLY,
        goal: 5,
        userId: 1,
        progress: 0,
        timeframe: "1 month",
        hasEnded: false,
        books: [
          {
            title: "The Hobbit",
            isbn: "978-3-16-148410-0",
            description: "A fantasy novel by J.R.R. Tolkien",
            publishDate: new Date("1954-07-29"),
            format: Format.PAPERBACK,
            language: "English",
            country: "United Kingdom",
            numOfPages: 310,
            pdfLink: "https://www.pdfdrive.com/download.pdf",
            coverPicture: "https://www.pdfdrive.com/cover.jpg",
            rating: 4.5,
            authors: [1],
            genres: [1],
          },
        ],
      };
      jest
        .spyOn(readingChallengesService, "updateReadingChallengeDetails")
        .mockResolvedValue(updatedReadingChallenge);

      await updateReadingChallengeDetails(req, res);

      expect(
        readingChallengesService.updateReadingChallengeDetails
      ).toHaveBeenCalledWith(1, { title: "New Title" });
      expect(res.send).toHaveBeenCalledWith(updatedReadingChallenge);
    });
    // Throws HttpException when readingChallengeId is missing
    it("should throw HttpException when readingChallengeId is missing", async () => {
      const req = {
        params: { readingChallengeId: "" },
        body: { title: "New Title" },
      } as unknown as Request;
      const res = {} as Response;

      await expect(updateReadingChallengeDetails(req, res)).rejects.toThrow(
        HttpException
      );
      await expect(updateReadingChallengeDetails(req, res)).rejects.toThrow(
        "Missing required field: readingChallengeId"
      );
    });
  });

  describe("deleteBookFromReadingChallenge", () => {
    // Successfully delete a book from a user's reading challenge when valid userId and bookId are provided
    it("should successfully delete a book from a user's reading challenge when valid userId and bookId are provided", async () => {
      const req = {
        params: {
          userId: "1",
          bookId: "2",
        },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedReadingChallenge: IReadingChallengeWithBooks = {
        id: 1,
        title: "New Challenge",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
        type: ReadingChallengeType.MONTHLY,
        goal: 5,
        userId: 1,
        progress: 0,
        timeframe: "1 month",
        hasEnded: false,
        books: [
          {
            id: 1,
            title: "The Hobbit",
            coverPicture: "https://www.pdfdrive.com/cover.jpg",
            rating: 4.5,
            authors: [
              {
                id: 1,
                name: "J.R.R. Tolkien",
              },
            ],
          },
        ],
      };

      jest
        .spyOn(readingChallengesService, "deleteBookFromUserReadingChallenges")
        .mockResolvedValue([updatedReadingChallenge]);

      await deleteBookFromReadingChallenge(req, res);

      expect(
        readingChallengesService.deleteBookFromUserReadingChallenges
      ).toHaveBeenCalledWith(1, 2);
      expect(res.send).toBeDefined();
    });
    it("should throw an HttpException when bookId is not provided in the request", async () => {
      const req = {
        params: {
          userId: "1",
          bookId: "",
        },
      } as unknown as Request;

      const res = {} as Response;

      await expect(deleteBookFromReadingChallenge(req, res)).rejects.toThrow(
        HttpException
      );
      await expect(deleteBookFromReadingChallenge(req, res)).rejects.toThrow(
        "Book ID is required"
      );
    });
  });
  describe("deleteReadingChallenge", () => {
    // Successfully delete a reading challenge when a valid ID is provided
    it("should delete the reading challenge when a valid ID is provided", async () => {
      const req = {
        params: {
          readingChallengeId: "1",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const mockDeletedReadingChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Read 5 books in a month",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
        type: ReadingChallengeType.MONTHLY,
        goal: 5,
        userId: 1,
        progress: 0,
        timeframe: "1 month",
        hasEnded: false,
        books: [
          {
            title: "The Hobbit",
            isbn: "978-3-16-148410-0",
            description: "A fantasy novel by J.R.R. Tolkien",
            publishDate: new Date("1954-07-29"),
            format: Format.PAPERBACK,
            language: "English",
            country: "United Kingdom",
            numOfPages: 310,
            pdfLink: "https://www.pdfdrive.com/download.pdf",
            coverPicture: "https://www.pdfdrive.com/cover.jpg",
            rating: 4.5,
            authors: [1],
            genres: [1],
          },
        ],
      };
      jest
        .spyOn(readingChallengesService, "deleteReadingChallenge")
        .mockResolvedValue(mockDeletedReadingChallenge);

      await deleteReadingChallenge(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockDeletedReadingChallenge);
    });

    // Handle cases where the reading challenge ID is missing or invalid
    it("should throw an error when the reading challenge ID is missing or invalid", async () => {
      const req = {
        params: {
          readingChallengeId: "",
        },
      } as unknown as Request;
      const res = {} as Response;

      await expect(deleteReadingChallenge(req, res)).rejects.toThrow(
        HttpException
      );
      await expect(deleteReadingChallenge(req, res)).rejects.toThrow(
        "Reading Challenge ID is required"
      );
    });
  });
});
