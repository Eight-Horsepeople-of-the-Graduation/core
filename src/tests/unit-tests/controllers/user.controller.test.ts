import { Format } from "@modules/books/book-format.enum";
import { Privacy } from "@modules/bookshelves/bookshelf-privacy.enum";
import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { Gender } from "@modules/users/user-gender.enum";
import {
  deleteUserById,
  getAllUsers,
  getBookshelfByUserId,
  getBookshelvesByUserId,
  getReadingChallengesByUserId,
  getReviewByUserId,
  getReviewsByUserId,
  getUserById,
  getUserByUsername,
  updateUserById,
} from "@modules/users/users.controller";
import usersService from "@modules/users/users.service";
import { Request, Response } from "express";

describe("User Controller Unit Tests", () => {
  describe("getAllUsers", () => {
    // Retrieve all users successfully with valid query parameters
    it("should retrieve all users successfully when valid query parameters are provided", async () => {
      const req = {
        query: { name: "John" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const users = [
        {
          username: "testuseername",
          email: "asmdask@gmail.com",
          name: "asdasdasd",
          password: "asdasdasd",
          country: "adasdasdas",
          gender: Gender.MALE,
          birthDate: new Date("1990-01-01"),
          id: 1,
          refreshToken: "asdasdasd",
          joinDate: new Date("2021-01-01T00:00:00.000Z"),
          profilePicture: "test.jpg",
          isAdmin: false,
        },
      ];
      jest.spyOn(usersService, "getAllUsers").mockResolvedValue(users);

      await getAllUsers(req, res);

      expect(usersService.getAllUsers).toHaveBeenCalledWith(
        expect.any(SearchQueryDto)
      );
      expect(res.send).toHaveBeenCalledWith(users);
    });
  });
  describe("getUserById", () => {
    it("should return user data when ID is valid", async () => {
      const req = { params: { userId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const user = {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: Gender.MALE,
        birthDate: new Date("1990-01-01"),
        id: 1,
        refreshToken: "asdasdasd",
        joinDate: new Date("2021-01-01T00:00:00.000Z"),
        profilePicture: "test.jpg",
        isAdmin: false,
      };

      jest.spyOn(usersService, "getUserById").mockResolvedValue(user);

      await getUserById(req, res);

      expect(usersService.getUserById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(user);
    });
  });
  describe("getUserByUsername", () => {
    it("should return user data when username exists", async () => {
      const req = {
        params: { username: "existingUser" },
      } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const user = {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: Gender.MALE,
        birthDate: new Date("1990-01-01"),
        id: 1,
        refreshToken: "asdasdasd",
        joinDate: new Date("2021-01-01T00:00:00.000Z"),
        profilePicture: "test.jpg",
        isAdmin: false,
      };

      jest.spyOn(usersService, "getUserByUsername").mockResolvedValue(user);

      await getUserByUsername(req, res);

      expect(usersService.getUserByUsername).toHaveBeenCalledWith(
        "existingUser"
      );
      expect(res.send).toHaveBeenCalledWith(user);
    });
  });
  describe("getReadingChallengesByUserId", () => {
    // Returns reading challenges for a valid user ID
    it("should return reading challenges when user ID is valid", async () => {
      const req = { params: { userId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const readingChallenges = [
        {
          id: 1,
          title: "New Challenge",
          description: "Read 5 books in a month",
          startDate: new Date("2023-01-01"),
          endDate: new Date("2023-01-31"),
          type: Duration.MONTHLY,
          goal: 5,
          userId: 1,
          progress: 0,
          timeframe: "1 month",
          hasEnded: false,
          books: [] as any[],
        },
      ];

      jest
        .spyOn(usersService, "getReadingChallengesByUserId")
        .mockResolvedValue(readingChallenges);

      await getReadingChallengesByUserId(req, res);

      expect(usersService.getReadingChallengesByUserId).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(readingChallenges);
    });
  });
  describe("getReviewsByUserId", () => {
    // Retrieve reviews for a valid user ID
    it("should return reviews when given a valid user ID", async () => {
      const req = { params: { userId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const reviews = [
        {
          userId: 1,
          bookId: 1,
          rating: 5,
          description: "Great book",
          title: "Great book",
          id: 1,
          createdAt: new Date("2021-01-01"),
          user: {
            username: "testuseername",
            email: "ASDASD",
            name: "asdasdasd",
            profilePicture: "test.jpg",
          },
          book: {
            title: "Test Book",
            isbn: "0802124739",
            description: "This is a test book",
            publishDate: new Date(),
            format: Format.HARDCOVER,
            language: "English",
            country: "United States",
            numOfPages: 100,
            id: 1,
            coverPicture: "test.jpg",
            rating: 5,
            pdfLink: "https://test.com",
            genres: {
              connect: {
                id: 1,
                title: "Test Genre",
              },
            },
            authors: {
              connect: {
                id: 1,
                name: "Test Author",
              },
            },
          },
        },
      ];

      jest.spyOn(usersService, "getReviewsByUserId").mockResolvedValue(reviews);

      await getReviewsByUserId(req, res);

      expect(usersService.getReviewsByUserId).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(reviews);
    });
  });
  describe("getReviewByUserId", () => {
    // Successfully retrieves a review when valid userId and reviewId are provided
    it("should return a review when valid userId and reviewId are provided", async () => {
      const req = {
        params: {
          userId: "1",
          reviewId: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockReview = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };

      jest
        .spyOn(usersService, "getReviewByUserId")
        .mockResolvedValue(mockReview);

      await getReviewByUserId(req, res);

      expect(usersService.getReviewByUserId).toHaveBeenCalledWith(1, 1);
      expect(res.send).toHaveBeenCalledWith(mockReview);
    });
  });
  describe("getBookshelvesByUserId", () => {
    // Retrieve bookshelves for a valid user ID
    it("should return bookshelves when user ID is valid", async () => {
      const req = { params: { userId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const bookshelves = [
        {
          id: 2,
          title: "Fiction",
          userId: 2,
          books: [] as any,
          _count: { books: 0 },
          createdAt: new Date("2021-09-01T00:00:00Z"),
          description: "Fiction",
          privacy: Privacy.PUBLIC,
          user: {
            id: 2,
            username: "user2",
            email: "sadmkl@sdmasl.com",
            name: "user22",
            profilePicture: "profilePicture",
          },
        },
      ];

      jest
        .spyOn(usersService, "getBookshelvesByUserId")
        .mockResolvedValue(bookshelves);

      await getBookshelvesByUserId(req, res);

      expect(usersService.getBookshelvesByUserId).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(bookshelves);
    });
  });
  describe("getBookshelfByUserId", () => {
    // Successfully retrieves bookshelf by valid user ID and bookshelf ID
    it("should return bookshelf when user ID and bookshelf ID are valid", async () => {
      const req = {
        params: {
          userId: "1",
          bookshelfId: "2",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelf = {
        id: 2,
        title: "Fiction",
        userId: 1,
        books: [] as any,
        _count: { books: 0 },
        createdAt: new Date("2021-09-01T00:00:00Z"),
        description: "Fiction",
        privacy: Privacy.PUBLIC,
        user: {
          id: 2,
          username: "user2",
          email: "sadmkl@sdmasl.com",
          name: "user22",
          profilePicture: "profilePicture",
        },
      };
      jest
        .spyOn(usersService, "getBookshelfByUserId")
        .mockResolvedValue(mockBookshelf);

      await getBookshelfByUserId(req, res);

      expect(usersService.getBookshelfByUserId).toHaveBeenCalledWith(1, 2);
      expect(res.send).toHaveBeenCalledWith(mockBookshelf);
    });
  });

  describe("updateUser", () => {
    // Successfully updates user information when valid userId and updatedData are provided
    it("should update user information when valid userId and updatedData are provided", async () => {
      const req = {
        params: { userId: "1" },
        body: { name: "Updated Name" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockUser = {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: Gender.MALE,
        birthDate: new Date("1990-01-01"),
        id: 1,
        refreshToken: "asdasdasd",
        joinDate: new Date("2021-01-01T00:00:00.000Z"),
        profilePicture: "test.jpg",
        isAdmin: false,
      };
      jest.spyOn(usersService, "updateUserById").mockResolvedValue(mockUser);

      await updateUserById(req, res);

      expect(usersService.updateUserById).toHaveBeenCalledWith(1, {
        name: "Updated Name",
      });
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });
  describe("deleteUser", () => {
    // Successfully deletes a user by valid userId
    it("should delete the user when userId is valid", async () => {
      const req = {
        params: {
          userId: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockUser = {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: Gender.MALE,
        birthDate: new Date("1990-01-01"),
        id: 1,
        refreshToken: "asdasdasd",
        joinDate: new Date("2021-01-01T00:00:00.000Z"),
        profilePicture: "test.jpg",
        isAdmin: false,
      };
      jest.spyOn(usersService, "deleteUserById").mockResolvedValue(mockUser);

      await deleteUserById(req, res);

      expect(usersService.deleteUserById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });
});
