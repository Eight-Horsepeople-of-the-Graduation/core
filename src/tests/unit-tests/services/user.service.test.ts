import { Format } from "@modules/books/book-format.enum";
import booksRepository from "@modules/books/books.repository";
import { Privacy } from "@modules/bookshelves/bookshelf-privacy.enum";
import bookshelvesRepository from "@modules/bookshelves/bookshelves.repository";
import { Duration } from "@modules/reading-challenges/reading-challenge-duration.enum";
import readingChallengesRepository from "@modules/reading-challenges/reading-challenges.repository";
import reviewsRepository from "@modules/reviews/reviews.repository";
import { Gender } from "@modules/users/user-gender.enum";
import usersRepository from "@modules/users/users.repository";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getBooksByUserId,
  getBookshelfByUserId,
  getBookshelvesByUserId,
  getReadingChallengeByUserId,
  getReadingChallengesByUserId,
  getReviewsByUserId,
  getUserById,
  getUserByUsername,
  updateUserById,
} from "@modules/users/users.service";

describe("UserService unit tests", () => {
  describe("getAllUsers", () => {
    // Retrieves all users successfully with valid filter
    it("should retrieve all users when given a valid filter", async () => {
      const filter = { term: "John" };
      const mockUsers = [
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

      jest.spyOn(usersRepository, "getAllUsers").mockResolvedValue(mockUsers);

      const result = await getAllUsers(filter);

      expect(result).toEqual(mockUsers);
      expect(usersRepository.getAllUsers).toHaveBeenCalledWith(filter);
    });
  });
  describe("getUserById", () => {
    // Retrieves user by valid ID
    it("should return user when ID is valid", async () => {
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
      jest.spyOn(usersRepository, "getUserById").mockResolvedValue(mockUser);

      const result = await getUserById(1);

      expect(result).toEqual(mockUser);
      expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
    });
  });
  describe("getUserByUsername", () => {
    // Retrieves user by username successfully
    it("should return user data when username exists", async () => {
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
      jest
        .spyOn(usersRepository, "getUserByUsername")
        .mockResolvedValue(mockUser);

      const result = await getUserByUsername("testuser");

      expect(result).toEqual(mockUser);
      expect(usersRepository.getUserByUsername).toHaveBeenCalledWith(
        "testuser"
      );
    });
  });

  describe("getBooksByUserId", () => {
    // Retrieves books successfully for a valid user ID
    it("should retrieve books successfully when user ID is valid", async () => {
      const userId = 1;
      const mockBooks = [
        {
          title: "Test Book 2",
          isbn: "08021247339",
          description: "This is a test book",
          publishDate: new Date("2021-01-01T00:00:00Z"),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          pdfLink: "https://test.com",
          coverPicture: "https://test.com",
          id: 1,
          rating: 4,
          authors: [
            {
              id: 1,
              name: "Test Author",
            },
          ],

          genres: [
            {
              id: 1,
              title: "Test Genre",
              description: "This is a test genre",
            },
          ],
        },
      ];
      jest
        .spyOn(booksRepository, "getBooksByUserId")
        .mockResolvedValue(mockBooks);

      const result = await getBooksByUserId(userId);

      expect(result).toEqual(mockBooks);
      expect(booksRepository.getBooksByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe("getReadingChallengesByUserId", () => {
    // Retrieves reading challenges for a valid user ID
    it("should return reading challenges when user ID is valid", async () => {
      const userId = 1;
      const mockReadingChallenges = [
        {
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
        },
      ];

      jest
        .spyOn(readingChallengesRepository, "getReadingChallengesByUserId")
        .mockResolvedValue(mockReadingChallenges);

      const result = await getReadingChallengesByUserId(userId);

      expect(result).toEqual(mockReadingChallenges);
      expect(
        readingChallengesRepository.getReadingChallengesByUserId
      ).toHaveBeenCalledWith(userId);
    });
  });
  describe("getReadingChallengeByUserId", () => {
    // Retrieve reading challenge for a valid user ID
    it("should return reading challenge when user ID is valid", async () => {
      const userId = 1;
      const mockReadingChallenge = [
        {
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
        },
      ];

      jest
        .spyOn(readingChallengesRepository, "getReadingChallengesByUserId")
        .mockResolvedValue(mockReadingChallenge);

      const result = await getReadingChallengeByUserId(userId);

      expect(result).toEqual(mockReadingChallenge);
      expect(
        readingChallengesRepository.getReadingChallengesByUserId
      ).toHaveBeenCalledWith(userId);
    });
  });
  describe("getReviewsByUserId", () => {
    // Retrieves reviews for a valid user ID
    it("should return reviews when user ID is valid", async () => {
      const userId = 1;
      const mockReviews = [
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
      jest
        .spyOn(reviewsRepository, "getReviewsByUserId")
        .mockResolvedValue(mockReviews);

      const result = await getReviewsByUserId(userId);

      expect(result).toEqual(mockReviews);
      expect(reviewsRepository.getReviewsByUserId).toHaveBeenCalledWith(userId);
    });
  });
  describe("getBookshelvesByUserId", () => {
    // Retrieve bookshelves for a valid user ID
    it("should return bookshelves when user ID is valid", async () => {
      const userId = 1;
      const mockBookshelves = [
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
        .spyOn(bookshelvesRepository, "getBookshelvesByUserId")
        .mockResolvedValue(mockBookshelves);

      const result = await getBookshelvesByUserId(userId);

      expect(result).toEqual(mockBookshelves);
      expect(bookshelvesRepository.getBookshelvesByUserId).toHaveBeenCalledWith(
        userId
      );
    });
  });

  describe("getBookshelfByUserId", () => {
    // Retrieves bookshelf successfully for valid userId and bookshelfId
    it("should return bookshelf when userId and bookshelfId are valid", async () => {
      const userId = 1;
      const bookshelfId = 1;
      const mockBookshelf = {
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
      };

      jest
        .spyOn(bookshelvesRepository, "getBookshelfByUserId")
        .mockResolvedValue(mockBookshelf);

      const result = await getBookshelfByUserId(userId, bookshelfId);

      expect(result).toEqual(mockBookshelf);
      expect(bookshelvesRepository.getBookshelfByUserId).toHaveBeenCalledWith(
        userId,
        bookshelfId
      );
    });
  });
  describe("create user", () => {
    // Successfully creates a new user with valid data
    it("should create a new user when valid data is provided", async () => {
      const createUserDto = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
        country: "USA",
        gender: Gender.MALE,
        isAdmin: false,
      };
      const expectedUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };

      usersRepository.createUser = jest.fn().mockResolvedValue(expectedUser);

      const result = await createUser(createUserDto);

      expect(usersRepository.createUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedUser);
    });
  });
  describe("update user", () => {
    // Successfully updates user data when valid userId and updatedData are provided
    it("should update user data when valid userId and updatedData are provided", async () => {
      const userId = 1;
      const updatedData = { name: "New Name" };
      const expectedUser = {
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

      jest
        .spyOn(usersRepository, "updateUserById")
        .mockResolvedValue(expectedUser);

      const result = await updateUserById(userId, updatedData);

      expect(result).toEqual(expectedUser);
      expect(usersRepository.updateUserById).toHaveBeenCalledWith(
        userId,
        updatedData
      );
    });
  });
  describe("delete user", () => {
    // Successfully delete a user by a valid user ID
    it("should return the user object when a valid user ID is provided", async () => {
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
      jest.spyOn(usersRepository, "deleteUserById").mockResolvedValue(mockUser);

      const result = await deleteUserById(1);

      expect(result).toEqual(mockUser);
      expect(usersRepository.deleteUserById).toHaveBeenCalledWith(1);
    });
  });
});
