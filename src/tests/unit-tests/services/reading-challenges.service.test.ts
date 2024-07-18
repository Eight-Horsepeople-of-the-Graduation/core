import { HttpStatus } from "@common/enums/http-status.enum";
import { HttpException } from "@common/exceptions/http.exception";
import booksRepository from "@modules/books/books.repository";
import { Format } from "@modules/books/dtos/books.dto";
import { Duration } from "@modules/reading-challenges/dtos/reading-challenges.dto";
import readingChallengesRepository from "@modules/reading-challenges/reading-challenges.repository";
import {
  addBookToUserReadingChallenges,
  createReadingChallenge,
  deleteBookFromUserReadingChallenges,
  deleteReadingChallenge,
  getAllReadingChallenges,
  getBooksByReadingChallengeId,
  getReadingChallengeById,
  updateReadingChallengeDetails,
} from "@modules/reading-challenges/reading-challenges.service";
import { Gender } from "@modules/users/dtos/users.dto";
import usersRepository from "@modules/users/users.repository";
import usersService from "@modules/users/users.service";
import { ReadingChallengeType } from "@prisma/client";
jest.mock('@modules/books/books.repository'); 

describe("Reading Challenges Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllReadingChallenges", () => {
    // Retrieves all reading challenges successfully
    it("should retrieve all reading challenges successfully when called", async () => {
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
        .spyOn(readingChallengesRepository, "getAllReadingChallenges")
        .mockResolvedValue(mockReadingChallenges);

      const result = await getAllReadingChallenges();

      expect(result).toEqual(mockReadingChallenges);
      expect(
        readingChallengesRepository.getAllReadingChallenges
      ).toHaveBeenCalledTimes(1);
    });
    // Handles database connection failures
    it("should throw an exception when database connection fails", async () => {
      jest
        .spyOn(readingChallengesRepository, "getAllReadingChallenges")
        .mockRejectedValue(new Error("Database connection failed"));

      await expect(getAllReadingChallenges()).rejects.toThrow(
        "Database connection failed"
      );
      expect(
        readingChallengesRepository.getAllReadingChallenges
      ).toHaveBeenCalledTimes(1);
    });
  });
  describe("getReadingChallengeById", () => {
    // Retrieves a reading challenge by a valid ID
    it("should return a reading challenge when given a valid ID", async () => {
      const mockReadingChallenge = {
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
      };
      jest
        .spyOn(readingChallengesRepository, "getReadingChallengeById")
        .mockResolvedValue(mockReadingChallenge);

      const result = await getReadingChallengeById(1);

      expect(result).toEqual(mockReadingChallenge);
      expect(
        readingChallengesRepository.getReadingChallengeById
      ).toHaveBeenCalledWith(1);
    });
  });
  describe("getBooksByReadingChallengeId", () => {
    // Retrieves books associated with a valid reading challenge ID
    it("should return books when given a valid reading challenge ID", async () => {
      const readingChallengeId = 1;
      const mockBooks = [
        {
          id: 1,
          title: "The Hobbit",
          isbn: "978-3-16-148410-0",
          description: "A fantasy novel by J.R.R. Tolkien",
          publishDate: new Date("1954-07-29"),
          format: Format.PAPERBACK,
          language: "English",
          country: "United Kingdom",
          numOfPages: 310,
          pdfLink: "https://www.pdfdrive.com/download-link",
          coverPicture: "https://www.cover-picture.com",
          rating: 4.5,
          authors: [1],
          genres: [1],
        },
      ];

      jest
        .spyOn(booksRepository, "getBooksByReadingChallengeId")
        .mockResolvedValue(mockBooks);

      const result = await getBooksByReadingChallengeId(readingChallengeId);

      expect(result).toEqual(mockBooks);
      expect(booksRepository.getBooksByReadingChallengeId).toHaveBeenCalledWith(
        readingChallengeId
      );
    });
    it("should return an empty array when the reading challenge ID does not exist", async () => {
      const readingChallengeId = 999;

      jest
        .spyOn(booksRepository, "getBooksByReadingChallengeId")
        .mockResolvedValue([]);

      const result = await getBooksByReadingChallengeId(readingChallengeId);

      expect(result).toEqual([]);
      expect(booksRepository.getBooksByReadingChallengeId).toHaveBeenCalledWith(
        readingChallengeId
      );
    });
  });
  describe("addBookToUserReadingChallenges", () => {
    // Throws "User not found" exception when the user does not exist
    it('should throw "User not found" exception when the user does not exist', async () => {
      const userId = 1;
      const bookId = 1;

      usersRepository.getUserById = jest.fn().mockResolvedValue(null);
      await expect(
        addBookToUserReadingChallenges(userId, bookId)
      ).rejects.toThrow(HttpException);
      await expect(
        addBookToUserReadingChallenges(userId, bookId)
      ).rejects.toThrow("User not found");
    });
    // it("should add a book to user's reading challenges when both user and book exist", async () => {
    //   const userId = 1;
    //   const bookId = 1;
    //   const mockUser = {
    //     id: 1,
    //     name: "John Doe",
    //     email: " [email protected]",
    //     isAdmin: false,
    //     gender: Gender.MALE,
    //     birthDate: new Date("1990-01-01"),
    //     joinDate: new Date("2021-01-01"),
    //     profilePicture: "https://www.profile-picture.com",
    //     refreshToken: "refresh-token",
    //     username: "johndoe",
    //     password: "password",
    //     country: "England",
    //   };
    //   const mockBook = {
    //     title: "The Hobbit",
    //     isbn: "978-3-16-148410-0",
    //     description: "A fantasy novel by J.R.R. Tolkien",
    //     publishDate: new Date("1954-07-29"),
    //     format: Format.PAPERBACK,
    //     language: "English",
    //     country: "United Kingdom",
    //     numOfPages: 310,
    //     id: 1,
    //     rating: 4.5,
    //     pdfLink: "https://www.pdfdrive.com/download-link",
    //     coverPicture: "https://www.cover-picture.com",
    //     authors: [{ id: 1, name: "Author Name" }],
    //     genres: [
    //       { id: 1, title: "Genre Name", description: "Genre Description" },
    //     ],
    //   };
    //   const mockUpdatedReadingChallenges = [
    //     {
    //       books: [] as any[],
    //       _count: { books: 1 },
    //       id: 1,
    //       title: "Challenge 1",
    //       userId: 1,
    //       type: ReadingChallengeType.MONTHLY,
    //       startDate: new Date("2023-01-01"),
    //       progress: 0,
    //       endDate: new Date("2023-04-01"),
    //       goal: 25,
    //       timeframe: "3 months",
    //       hasEnded: false,
    //     },
    //   ];

    //   jest.spyOn(usersService, "getUserById").mockResolvedValue(mockUser);
    //   jest.spyOn(booksRepository, "getBookById").mockResolvedValue(mockBook);
    //   jest
    //     .spyOn(readingChallengesRepository, "addBookToUserReadingChallenges")
    //     .mockResolvedValue(mockUpdatedReadingChallenges);

    //   const result = await addBookToUserReadingChallenges(userId, bookId);

    //   expect(result).toEqual(mockUpdatedReadingChallenges);
    //   expect(usersService.getUserById).toHaveBeenCalledWith(userId);
    //   expect(booksRepository.getBookById).toHaveBeenCalledWith(bookId);
    //   expect(
    //     readingChallengesRepository.addBookToUserReadingChallenges
    //   ).toHaveBeenCalledWith(userId, bookId);
    // });
  });
  describe("createReadingChallenge", () => {
    // Successfully create a new reading challenge when no active challenge of the same type exists for the user
    it("should create a new reading challenge when no active challenge of the same type exists for the user", async () => {
      const readingChallengeData = {
        books: [] as any[],
        _count: { books: 1 },
        id: 1,
        title: "Challenge 1",
        userId: 1,
        type: Duration.MONTHLY,
        startDate: new Date("2023-01-01"),
        progress: 0,
        endDate: new Date("2023-04-01"),
        goal: 25,
        timeframe: "3 months",
        hasEnded: false,
      };
      const createdReadingChallenge = {
        id: "challenge123",
        ...readingChallengeData,
      };

      jest
        .spyOn(readingChallengesRepository, "getActiveReadingChallengeByType")
        .mockResolvedValue(null);
      jest
        .spyOn(readingChallengesRepository, "createReadingChallenge")
        .mockResolvedValue(createdReadingChallenge);

      const result = await createReadingChallenge(readingChallengeData);

      expect(result).toEqual(createdReadingChallenge);
      expect(
        readingChallengesRepository.createReadingChallenge
      ).toHaveBeenCalledWith(readingChallengeData);
    });
    // Handle scenario where readingChallengesRepository.getActiveReadingChallengeByType returns null or undefined
    it("should handle scenario where getActiveReadingChallengeByType returns null or undefined", async () => {
      const readingChallengeData = {
        books: [] as any[],
        _count: { books: 1 },
        id: 1,
        title: "Challenge 1",
        userId: 1,
        type: Duration.MONTHLY,
        startDate: new Date("2023-01-01"),
        progress: 0,
        endDate: new Date("2023-04-01"),
        goal: 25,
        timeframe: "3 months",
        hasEnded: false,
      };
      const createdReadingChallenge = {
        id: "challenge456",
        ...readingChallengeData,
      };

      jest
        .spyOn(readingChallengesRepository, "getActiveReadingChallengeByType")
        .mockResolvedValue(undefined);
      jest
        .spyOn(readingChallengesRepository, "createReadingChallenge")
        .mockResolvedValue(createdReadingChallenge);

      const result = await createReadingChallenge(readingChallengeData);

      expect(result).toEqual(createdReadingChallenge);

      expect(
        readingChallengesRepository.createReadingChallenge
      ).toHaveBeenCalledWith(readingChallengeData);
    });
  });
  describe("deleteBookFromReadingChallenge", () => {
    // Successfully delete a book from a user's reading challenges when both user and book exist
    // it("should successfully delete a book from a user's reading challenges when both user and book exist", async () => {
    //   //   const userId = 1;
    //   //   const bookId = 1;
    //   //   const mockUser = {
    //   //     id: 1,
    //   //     name: "John Doe",
    //   //     email: " [email protected]",
    //   //     isAdmin: false,
    //   //     gender: Gender.MALE,
    //   //     birthDate: new Date("1990-01-01"),
    //   //     joinDate: new Date("2021-01-01"),
    //   //     profilePicture: "https://www.profile-picture.com",
    //   //     refreshToken: "refresh-token",
    //   //     username: "johndoe",
    //   //     password: "password",
    //   //     country: "England",
    //   //   };
    //   //   const mockBook = {
    //   //     title: "The Hobbit",
    //   //     isbn: "978-3-16-148410-0",
    //   //     description: "A fantasy novel by J.R.R. Tolkien",
    //   //     publishDate: new Date("1954-07-29"),
    //   //     format: Format.PAPERBACK,
    //   //     language: "English",
    //   //     country: "United Kingdom",
    //   //     numOfPages: 310,
    //   //     id: 1,
    //   //     rating: 4.5,
    //   //     pdfLink: "https://www.pdfdrive.com/download-link",
    //   //     coverPicture: "https://www.cover-picture.com",
    //   //     authors: [{ id: 1, name: "Author Name" }],
    //   //     genres: [
    //   //       { id: 1, title: "Genre Name", description: "Genre Description" },
    //   //     ],
    //   //   };
    //   //   const mockUpdatedReadingChallenges = [
    //   //     {
    //   //       books: [] as any[],
    //   //       _count: { books: 1 },
    //   //       id: 1,
    //   //       title: "Challenge 1",
    //   //       userId: 1,
    //   //       type: ReadingChallengeType.MONTHLY,
    //   //       startDate: new Date("2023-01-01"),
    //   //       progress: 0,
    //   //       endDate: new Date("2023-04-01"),
    //   //       goal: 25,
    //   //       timeframe: "3 months",
    //   //       hasEnded: false,
    //   //     },
    //   //   ];
    //   //   jest.spyOn(booksRepository, "getBookById").mockResolvedValue(mockBook);
    //   //   jest.spyOn(usersService, "getUserById").mockResolvedValue(mockUser);
    //   //   jest
    //   //     .spyOn(
    //   //       readingChallengesRepository,
    //   //       "deleteBookFromUserReadingChallenges"
    //   //     )
    //   //     .mockResolvedValue(mockUpdatedReadingChallenges);
    //   //   const result = await deleteBookFromUserReadingChallenges(userId, bookId);
    //   //   expect(result).toEqual(mockUpdatedReadingChallenges);
    //   //   expect(booksRepository.getBookById).toHaveBeenCalledWith(bookId);
    //   //   expect(usersService.getUserById).toHaveBeenCalledWith(userId);
    //   //   expect(
    //   //     readingChallengesRepository.deleteBookFromUserReadingChallenges
    //   //   ).toHaveBeenCalledWith(userId, bookId);
    // });
    // Attempt to delete a book that does not exist
    it("should throw an error when attempting to delete a book that does not exist", async () => {
      const userId = 1;
      const bookId = 999;

      booksRepository.getBookById = jest.fn().mockRejectedValue(null);
      await expect(
        deleteBookFromUserReadingChallenges(userId, bookId)
      ).rejects.toThrow(HttpException);
    });
  });
  describe("updateReadingChallengeDetails", () => {
    // Successfully updates a reading challenge with valid data
    it("should update the reading challenge when valid data is provided", async () => {
      const readingChallengeId = 1;
      const updatedData = {
        title: "New Title",
        description: "New Description",
      };
      const updatedReadingChallenge = {
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
      };

      jest
        .spyOn(readingChallengesRepository, "updateReadingChallengeDetails")
        .mockResolvedValue(updatedReadingChallenge);

      const result = await updateReadingChallengeDetails(
        readingChallengeId,
        updatedData
      );

      expect(result).toEqual(updatedReadingChallenge);
      expect(
        readingChallengesRepository.updateReadingChallengeDetails
      ).toHaveBeenCalledWith(readingChallengeId, updatedData);
    });
    // Handles non-existent reading challenge ID gracefully
    it("should throw an error when the reading challenge ID does not exist", async () => {
      const readingChallengeId = 999;
      const updatedData = {
        title: "New Title",
        description: "New Description",
      };

      jest
        .spyOn(readingChallengesRepository, "updateReadingChallengeDetails")
        .mockImplementation(() => {
          throw new HttpException(
            "Reading Challenge not found",
            HttpStatus.NOT_FOUND
          );
        });

      await expect(
        updateReadingChallengeDetails(readingChallengeId, updatedData)
      ).rejects.toThrow("Reading Challenge not found");
      expect(
        readingChallengesRepository.updateReadingChallengeDetails
      ).toHaveBeenCalledWith(readingChallengeId, updatedData);
    });
  });
  describe("deleteReadingChallenge", () => {
    // Successfully delete a reading challenge by valid ID
    it("should successfully delete a reading challenge when given a valid ID", async () => {
      const readingChallengeId = 1;
      const mockDeletedReadingChallenge = {
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
      };

      jest
        .spyOn(readingChallengesRepository, "deleteReadingChallenge")
        .mockResolvedValue(mockDeletedReadingChallenge);

      const result = await deleteReadingChallenge(readingChallengeId);

      expect(result).toEqual(mockDeletedReadingChallenge);
      expect(
        readingChallengesRepository.deleteReadingChallenge
      ).toHaveBeenCalledWith(readingChallengeId);
    });
  });
});
