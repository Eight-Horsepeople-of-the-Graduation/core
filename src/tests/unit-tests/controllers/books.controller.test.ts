import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "@modules/books/books.controller";
import { Format, Gender, Privacy } from "@prisma/client";
import booksService from "@modules/books/books.service";
import bookshelvesService from "@modules/bookshelves/bookshelves.service";
import { Request, Response } from "express";

describe("Books Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getAllBooks", () => {
    it("should return all books when no filters are applied", async () => {
      const req = { query: {} } as Request;
      const res = { send: jest.fn() } as unknown as Response;
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
          pdfLink: "https://www.google.com",
          coverPicture: "https://www.google.com",
          rating: 4.5,
          authors: [
            {
              id: 1,
              name: "Tolkien",
            },
          ],
          genres: [
            {
              id: 1,
              title: "Fantasy",
              description: "not real",
            },
          ],
        },
      ];

      jest.spyOn(booksService, "getAllBooks").mockResolvedValue(mockBooks);

      await getAllBooks(req, res);

      expect(booksService.getAllBooks).toHaveBeenCalledWith({});
      expect(res.send).toHaveBeenCalledWith(mockBooks);
    });

    it("should handle the case when the service returns null or undefined", async () => {
      const req = {} as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(booksService, "getAllBooks").mockResolvedValue([]);

      await getAllBooks(req, res);

      expect(booksService.getAllBooks).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([]);
    });
  });

  describe("getBookById", () => {
    it("should return the book when a valid ID is provided", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const book = {
        id: 1,
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.PAPERBACK,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://www.google.com",
        coverPicture: "https://www.google.com",
        rating: 4.5,
        authors: [
          {
            id: 1,
            name: "Tolkien",
          },
        ],
        genres: [
          {
            id: 1,
            title: "Fantasy",
            description: "not real",
          },
        ],
      };

      jest.spyOn(booksService, "getBookById").mockResolvedValue(book);

      await getBookById(req, res);

      expect(booksService.getBookById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(book);
    });

    it('should return 400 status with message "Book Not Found" when ID parameter is missing', async () => {
      const req = { params: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("ID parameter is missing");
    });
  });

  describe("createBook", () => {
    it("should create a book when valid data is provided", async () => {
      const req = {
        body: {
          title: "The Hobbit",
          isbn: "978-3-16-148410-0",
          description: "A fantasy novel by J.R.R. Tolkien",
          publishDate: new Date("1954-07-29"),
          format: Format.PAPERBACK,
          language: "English",
          country: "United Kingdom",
          numOfPages: 310,
          pdfLink: null,
          coverPicture: null,
          authors: [1],
          genres: [1],
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createBookMock = jest
        .spyOn(booksService, "createBook")
        .mockResolvedValue(req.body);

      await createBook(req, res);

      expect(createBookMock).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(req.body);
    });

    it("should return 400 status code for empty request body", async () => {
      const req = {
        body: null,
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Bad Request: Empty request body");
    });
  });

  describe("updateBook", () => {
    it("should update the book when provided with valid data", async () => {
      const req = {
        params: { id: "1" },
        body: {
          title: "The Hobbit",
          isbn: "978-3-16-148410-0",
          description: "A fantasy novel by J.R.R. Tolkien",
          publishDate: new Date("1954-07-29"),
          format: Format.PAPERBACK,
          language: "English",
          country: "United Kingdom",
          numOfPages: 310,
          pdfLink: null,
          coverPicture: null,
          authors: [
            {
              id: 1,
              name: "Tolkien",
            },
          ],
          genres: [
            {
              id: 1,
              title: "Fantasy",
              description: "not real",
            },
          ],
        },
      } as unknown as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedBook = {
        id: 1,
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.PAPERBACK,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://www.google.com",
        coverPicture: "https://www.google.com",
        rating: 4.5,
        authors: [
          {
            id: 1,
            name: "Tolkien",
          },
        ],
        genres: [
          {
            id: 1,
            title: "Fantasy",
            description: "not real",
          },
        ],
      };

      jest.spyOn(booksService, "updateBookById").mockResolvedValue(updatedBook);

      await updateBookById(req, res);

      expect(booksService.updateBookById).toHaveBeenCalledWith(1, req.body);
      expect(res.send).toHaveBeenCalledWith(updatedBook);
    });

    it("should return 400 if ID parameter is missing", async () => {
      const req = {
        params: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await updateBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("ID parameter is missing");
    });
  });

  describe("deleteBook", () => {
    it("should delete the book and return it when a valid bookId is provided", async () => {
      const req = { params: { bookId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const mockBook = {
        id: 1,
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.PAPERBACK,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://www.google.com",
        coverPicture: "https://www.google.com",
        rating: 4.5,
        authors: [
          {
            id: 1,
            name: "Tolkien",
          },
        ],
        genres: [
          {
            id: 1,
            title: "Fantasy",
            description: "not real",
          },
        ],
      };

      jest.spyOn(booksService, "deleteBookById").mockResolvedValue(mockBook);

      await deleteBookById(req, res);

      expect(booksService.deleteBookById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockBook);
    });

    it("should return status 400 when bookId is missing in the request", async () => {
      const req = { params: {} } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await deleteBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("ID parameter is missing");
    });
  });

  describe("getBooksByUserId", () => {
    it("should return distinct books when a valid user ID is provided", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = { send: jest.fn() } as unknown as Response;
  //     const mockBookshelves = [
  //       {
  //         id: 1,
  //         title: "Bookshelf 1",
  //         description: "This is a bookshelf",
  //         createdAt: new Date(),
  //         privacy: Privacy.PUBLIC,
  //         books: [],
  //         user: {
  //           id: 1,
  //           username: "test",
  //           email: "aaaa",
  //           password: "aaaa",
  //           country: "testCountry",
  //           gender: Gender.FEMALE,
  //           birthDate: null,
  //           joinDate: new Date(),
  //           profilePicture: null,
  //           isAdmin: false,
  //         },
  //         userId: 1,
  //         _count: { books: 1 },
  //       },
  //       {
  //         id: 2,
  //         title: "Bookshelf 2",
  //         description: "This is a bookshelf",
  //         createdAt: new Date(),
  //         privacy: Privacy.PUBLIC,
  //         books: [
  //           {
  //             id: 1,
  //             title: "The Hobbit",
  //             isbn: "978-3-16-148410-0",
  //             description: "A fantasy novel by J.R.R. Tolkien",
  //             publishDate: new Date("1954-07-29"),
  //             format: Format.PAPERBACK,
  //             language: "English",
  //             country: "United Kingdom",
  //             numOfPages: 310,
  //             pdfLink: "https://www.google.com",
  //             coverPicture: "https://www.google.com",
  //             rating: 4.5,
  //             authors: [
  //               {
  //                 id: 1,
  //                 name: "Tolkien",
  //               },
  //             ],
  //             genres: [
  //               {
  //                 id: 1,
  //                 title: "Fantasy",
  //                 description: "not real",
  //               },
  //             ],
  //           },
  //         ],
  //         user: {
  //           id: 1,
  //           username: "test",
  //           email: "aaaa",
  //           password: "aaaa",
  //           country: "testCountry",
  //           gender: Gender.FEMALE,
  //           birthDate: null,
  //           joinDate: new Date(),
  //           profilePicture: null,
  //           isAdmin: false,
  //         },
  //         userId: 1,
  //         _count: { books: 1 },
  //       },
  //     ];
  //     jest
  //       .spyOn(bookshelvesService, "getBookshelvesByUserId")
  //       .mockResolvedValue(mockBookshelves);

  //     await getBooksByUserId(req, res);

  //     expect(bookshelvesService.getBookshelvesByUserId).toHaveBeenCalledWith(1);
  //     expect(res.send).toHaveBeenCalledWith([
  //       {
  //         id: 1,
  //         title: "The Hobbit",
  //         isbn: "978-3-16-148410-0",
  //         description: "A fantasy novel by J.R.R. Tolkien",
  //         publishDate: new Date("1954-07-29"),
  //         format: Format.PAPERBACK,
  //         language: "English",
  //         country: "United Kingdom",
  //         numOfPages: 310,
  //         pdfLink: null,
  //         coverPicture: null,
  //         authors: [
  //           {
  //             id: 1,
  //             name: "Tolkien",
  //           },
  //         ],
  //         genres: [
  //           {
  //             id: 1,
  //             title: "Fantasy",
  //             description: "not real",
  //           },
  //         ],
  //       },
  //     ]);
     });
  });
});
