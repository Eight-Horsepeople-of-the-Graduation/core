import {
  addBookToBookshelf,
  createBookshelf,
  getAllBookshelves,
  getBookshelfById,
} from "@controllers/bookshelves.controller";
import { Format, Gender, Privacy } from "@prisma/client";
import bookshelvesService from "@services/bookshelves.service";
import { Request, Response, query } from "express";
import _ from "lodash";

describe("Bookshelves Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBookshelves", () => {
    it("should retrieve all bookshelves with default parameters", async () => {
      const req = {
        query: {},
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = [
        {
          id: 1,
          title: "Bookshelf 1",
          description: "This is a bookshelf",
          createdAt: new Date(),
          privacy: Privacy.PUBLIC,
          books: [],
          user: {
            id: 1,
            username: "test",
            email: "aaaa",
            password: "aaaa",
            country: "testCountry",
            gender: Gender.female,
            birthDate: null,
            joinDate: new Date(),
            profilePicture: null,
            isAdmin: false,
          },
          userId: 1,
          _count: { books: 0 },
        },
        {
          id: 2,
          title: "Bookshelf 2",
          description: "This is another bookshelf",
          createdAt: new Date(),
          privacy: Privacy.PUBLIC,
          books: [
            {
              id: 1,
              title: "Book 1",
              isbn: "123-456-789",
              description: "This is a book description",
              publishDate: new Date(),
              format: Format.HARDCOVER,
              language: "English",
              country: "testCountry",
              numOfPages: 300,
              pdfLink: null,
              coverPicture: null,
            },
          ],
          user: {
            id: 1,
            username: "test",
            email: "aaaa",
            password: "aaaa",
            country: "testCountry",
            gender: Gender.female,
            birthDate: null,
            joinDate: new Date(),
            profilePicture: null,
            isAdmin: false,
          },
          userId: 1,
          _count: { books: 1 },
        },
      ];
      jest
        .spyOn(bookshelvesService, "getAllBookshelves")
        .mockResolvedValue(mockBookshelves);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith({});
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
    it("should retrieve all bookshelves when no bookshelves are found", async () => {
      const req = {
        query: {},
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(bookshelvesService, "getAllBookshelves").mockResolvedValue([]);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith({});
      expect(res.send).toHaveBeenCalledWith([]);
    });
    it("should retrieve bookshelves with specific filters", async () => {
      const req = {
        query: {
          userId: 1,
        },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = [
        {
          id: 1,
          title: "Bookshelf 1",
          description: "This is a bookshelf",
          createdAt: new Date(),
          privacy: Privacy.PUBLIC,
          books: [],
          user: {
            id: 1,
            username: "test",
            email: "aaaa",
            password: "aaaa",
            country: "testCountry",
            gender: Gender.female,
            birthDate: null,
            joinDate: new Date(),
            profilePicture: null,
            isAdmin: false,
          },
          userId: 1,
          _count: { books: 0 },
        },
      ];

      jest
        .spyOn(bookshelvesService, "getAllBookshelves")
        .mockResolvedValue(mockBookshelves);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith({
        userId: 1,
      });
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
    it("should return an empty array when user id does not exist", async () => {
      const req = {
        query: { page: 1, limit: 10, userId: 2 },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = [
        {
          id: 1,
          title: "Bookshelf 1",
          description: "This is a bookshelf",
          createdAt: new Date(),
          privacy: Privacy.PUBLIC,
          books: [],
          user: {
            id: 1,
            username: "test",
            email: "aaaa",
            password: "aaaa",
            country: "testCountry",
            gender: Gender.female,
            birthDate: null,
            joinDate: new Date(),
            profilePicture: null,
            isAdmin: false,
          },
          userId: 1,
          _count: { books: 0 },
        },
      ];

      jest
        .spyOn(bookshelvesService, "getAllBookshelves")
        .mockResolvedValue(mockBookshelves);

      await getAllBookshelves(req, res);

      expect(bookshelvesService.getAllBookshelves).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        userId: 2,
      });
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
  });
  describe("getBookshelfById", () => {
    it("should return correct bookshelf when a valid ID is provided", async () => {
      const req = {
        params: {
          id: 1,
        },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = {
        id: 1,
        title: "Bookshelf 1",
        description: "This is a bookshelf",
        createdAt: new Date(),
        privacy: Privacy.PUBLIC,
        books: [],
        user: {
          id: 1,
          username: "test",
          email: "aaaa",
          password: "aaaa",
          country: "testCountry",
          gender: Gender.female,
          birthDate: null,
          joinDate: new Date(),
          profilePicture: null,
          isAdmin: false,
        },
        userId: 1,
        _count: { books: 0 },
      };

      jest
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(mockBookshelves);

      await getBookshelfById(req, res);

      expect(bookshelvesService.getBookshelfById).toHaveBeenCalledWith({
        id: 1,
      });
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
    it("should return correct bookshelf when a valid ID type is provided", async () => {
      const req = {
        params: {
          id: "1",
        },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockBookshelves = {
        id: 1,
        title: "Bookshelf 1",
        description: "This is a bookshelf",
        createdAt: new Date(),
        privacy: Privacy.PUBLIC,
        books: [],
        user: {
          id: 1,
          username: "test",
          email: "aaaa",
          password: "aaaa",
          country: "testCountry",
          gender: Gender.female,
          birthDate: null,
          joinDate: new Date(),
          profilePicture: null,
          isAdmin: false,
        },
        userId: 1,
        _count: { books: 0 },
      };

      jest
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(mockBookshelves);

      await getBookshelfById(req, res);

      expect(bookshelvesService.getBookshelfById).toHaveBeenCalledWith({
        id: 1,
      });
      expect(res.send).toHaveBeenCalledWith(mockBookshelves);
    });
    it("should return 400 status with Bookshelf Not Found message for non-existent ID", async () => {
      const req = {
        params: {
          id: 999,
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(null);

      await getBookshelfById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Bookshelf Not Found");
    });
    it("should return status 400 with error message when ID is invalid", async () => {
      const req = {
        params: {
          id: "",
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(bookshelvesService, "getBookshelfById")
        .mockResolvedValue(null);

      await getBookshelfById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID parameter");
    });
  });
  describe("createBookshelf", () => {
    it("should create a bookshelf when valid data is provided", async () => {
      const req = {
        body: {
          title: "Bookshelf 1",
          description: "this is a description",
          privacy: Privacy.PRIVATE,
          userId: 1,
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createdBookshelf = {
        id: 1,
        title: "Bookshelf 1",
        description: "this is a description",
        privacy: Privacy.PRIVATE,
        userId: 1,
        books: [],
        _count: { books: 0 },
        createdAt: new Date(),
      };

      jest
        .spyOn(bookshelvesService, "createBookshelf")
        .mockResolvedValue(createdBookshelf);

      await createBookshelf(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(createdBookshelf);
    });
  });
  // describe("addBookToBookshelf", () => {
  //   it("should successfully add books to an existing bookshelf when valid bookshelf ID and book IDs are provided", async () => {
  //     const req = {
  //       params: { id: "1" },
  //       body: {
  //         bookIds: [1, 2, 3],
  //       },
  //     } as unknown as Request;
  //     const res = {
  //       send: jest.fn(),
  //     } as unknown as Response;

  //     const mockAddBookToBookshelf = jest
  //       .spyOn(bookshelvesService, "addBookToBookshelf")
  //       .mockResolvedValue();

  //     await addBookToBookshelf(req, res);

  //     expect(mockAddBookToBookshelf).toHaveBeenCalledWith({ id: 1 }, [1, 2, 3]);
  //   });

  //   it("should return an error if bookshelf does not exist", async () => {
  //     const req = {
  //       params: { id: 999 },
  //       body: {
  //         booksIds: [1, 2, 3],
  //       },
  //     } as unknown as Request;

  //     const res = {
  //       send: jest.fn(),
  //     } as unknown as Response;

  //     const mockAddBookToBookshelf = jest
  //       .spyOn(bookshelvesService, "addBookToBookshelf")
  //       .mockResolvedValue({});

  //     await addBookToBookshelf(req, res);

  //     expect(res.send).toHaveBeenCalledWith("Bookshelf Not Found");
  //   });
  // });
});
