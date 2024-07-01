import { getAllBookshelves } from "@controllers/bookshelves.controller";
import { Format, Gender, Privacy } from "@prisma/client";
import bookshelvesService from "@services/bookshelves.service";
import { Request, Response } from "express";
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
            gender: Gender.FEMALE,
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
            },
          ],
          user: {
            id: 1,
            username: "test",
            email: "aaaa",
            password: "aaaa",
            country: "testCountry",
            gender: Gender.FEMALE,
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
  });
});
