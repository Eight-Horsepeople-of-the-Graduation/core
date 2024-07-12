import {
  addBookToBookshelf,
  createBookshelf,
  deleteBookshelf,
  getAllBookshelves,
  getBookshelfById,
  getBookshelvesByUserId,
  removeBooksFromBookshelf,
  updateBookshelf,
} from "@modules/bookshelves/bookshelves.controller";
import bookshelvesService from "@modules/bookshelves/bookshelves.service";
import { Privacy } from "@modules/bookshelves/dtos/bookshelves.dto";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { Request, Response } from "express";

describe("Bookshelves Controller Unit Tests", () => {
  describe("getBookshelves", () => {
    // Retrieves all bookshelves successfully
    it("should retrieve all bookshelves successfully when valid query parameters are provided", async () => {
      const req = {
        query: { search: "fiction" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = [
        {
          id: 1,
          title: "Fiction",
          userId: 1,
          books: [] as any,
          _count: { books: 0 },
          createdAt: new Date("2021-09-01T00:00:00Z"),
          description: "Fiction",
          privacy: Privacy.PUBLIC,
          user: {
            id: 1,
            username: "user1",
            email: "sadmskl@sdmasl.com",
            name: "user12",
            profilePicture: "profilePicture",
          },
        },
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
        .spyOn(bookshelvesService, "getAllBookshelves")
        .mockResolvedValue(mockBookshelves);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith(
        expect.any(SearchQueryDto)
      );
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
    // Manages unexpected data types in query parameters
    it("should manage unexpected data types in query parameters", async () => {
      const req = {
        query: { param: 123 },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(bookshelvesService, "getAllBookshelves").mockResolvedValue([]);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith(
        expect.any(SearchQueryDto)
      );
      expect(res.send).toHaveBeenCalledWith([]);
    });
  });
  describe("getBookshelfById", () => {
    // Valid bookshelf ID returns the correct bookshelf
    it("should return the correct bookshelf when a valid ID is provided", async () => {
      const req = {
        params: {
          bookshelfId: "1",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;
      const bookshelf = {
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
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(bookshelf);

      await getBookshelfById(req, res);

      expect(res.send).toHaveBeenCalledWith(bookshelf);
    });

    // Invalid bookshelf ID returns a 400 status with "Invalid ID parameter"
    it('should return 400 status with "Invalid ID parameter" when ID is invalid', async () => {
      const req = {
        params: {
          bookshelfId: "invalid",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await getBookshelfById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });

  describe("get bookshelves by user id", () => {
    // Retrieves bookshelf by valid user ID
    it("should retrieve bookshelf when given a valid user ID", async () => {
      const req = { params: { bookshelfId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const bookshelf = {
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
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(bookshelf);

      await getBookshelvesByUserId(req, res);

      expect(bookshelvesService.getBookshelfById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(bookshelf);
    });

    // Handles non-numeric user ID gracefully
    it("should return 400 status when given a non-numeric user ID", async () => {
      const req = { params: { bookshelfId: "abc" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await getBookshelvesByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });

  describe("createBookshelf", () => {
    // Successfully creates a bookshelf with valid data
    it("should create a bookshelf when valid data is provided", async () => {
      const req = {
        body: { title: "New Bookshelf", description: "A new bookshelf" },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

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
        .spyOn(bookshelvesService, "createBookshelf")
        .mockResolvedValue(mockBookshelf);

      await createBookshelf(req, res);

      expect(bookshelvesService.createBookshelf).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockBookshelf);
    });
  });

  describe("addBookToBookshelf", () => {
    // Successfully adds books to a valid bookshelf ID
    it("should add books to a valid bookshelf ID", async () => {
      const req = {
        params: { bookshelfId: "1" },
        body: { bookIds: [101, 102] },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedBookshelf = {
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
        .spyOn(bookshelvesService, "addBookToBookshelf")
        .mockResolvedValue(updatedBookshelf);

      await addBookToBookshelf(req, res);

      expect(bookshelvesService.addBookToBookshelf).toHaveBeenCalledWith(
        1,
        [101, 102]
      );
      expect(res.send).toHaveBeenCalledWith(updatedBookshelf);
    });

    // Returns 400 status for invalid bookshelf ID
    it("should return 400 status for invalid bookshelf ID", async () => {
      const req = {
        params: { bookshelfId: "invalid" },
        body: { bookIds: [101, 102] },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await addBookToBookshelf(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });
  describe("removeBooksFromBookshelf", () => {
    // Successfully removes books from a valid bookshelf
    it("should remove books from a valid bookshelf when valid bookshelfId and bookIds are provided", async () => {
      const req = {
        params: { bookshelfId: "1" },
        body: { bookIds: [1, 2, 3] },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedBookshelf = {
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
        .spyOn(bookshelvesService, "removeBooksFromBookshelf")
        .mockResolvedValue(updatedBookshelf);

      await removeBooksFromBookshelf(req, res);

      expect(bookshelvesService.removeBooksFromBookshelf).toHaveBeenCalledWith(
        1,
        [1, 2, 3]
      );
      expect(res.send).toHaveBeenCalledWith(updatedBookshelf);
    });

    // bookshelfId is not a number
    it("should return 400 status when bookshelfId is not a number", async () => {
      const req = {
        params: { bookshelfId: "abc" },
        body: { bookIds: [1, 2, 3] },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await removeBooksFromBookshelf(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });
  describe("updateBookshelf", () => {
    // Successfully updates a bookshelf with valid ID and data
    it("should update the bookshelf when given a valid ID and data", async () => {
      const req = {
        params: { bookshelfId: "1" },
        body: { name: "Updated Bookshelf" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedBookshelf = {
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
        .spyOn(bookshelvesService, "updateBookshelf")
        .mockResolvedValue(updatedBookshelf);

      await updateBookshelf(req, res);

      expect(bookshelvesService.updateBookshelf).toHaveBeenCalledWith(1, {
        name: "Updated Bookshelf",
      });
      expect(res.send).toHaveBeenCalledWith(updatedBookshelf);
    });
    // Returns a 400 status code when the bookshelf ID is not a number
    it("should return 400 when the bookshelf ID is not a number", async () => {
      const req = {
        params: { bookshelfId: "abc" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await updateBookshelf(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });
  describe("deleteBookshelf", () => {
    // Successfully delete a bookshelf with a valid ID
    it("should delete the bookshelf when a valid ID is provided", async () => {
      const req = { params: { bookshelfId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const deleteBookshelfMock = jest
        .spyOn(bookshelvesService, "deleteBookshelf")
        .mockResolvedValue({
          id: 1,
          title: "Bookshelf Title",
          description: "Bookshelf Description",
          createdAt: new Date("2021-09-01T00:00:00.000Z"),
          privacy: Privacy.PUBLIC,
          userId: 1,
        });

      await deleteBookshelf(req, res);

      expect(deleteBookshelfMock).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({
        id: 1,
        title: "Bookshelf Title",
        description: "Bookshelf Description",
        createdAt: new Date("2021-09-01T00:00:00.000Z"),
        privacy: Privacy.PUBLIC,
        userId: 1,
      });
    });
    // Handle non-numeric bookshelf ID in the request parameters
    it("should return 400 status when the ID is non-numeric", async () => {
      const req = { params: { bookshelfId: "abc" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await deleteBookshelf(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });
});
