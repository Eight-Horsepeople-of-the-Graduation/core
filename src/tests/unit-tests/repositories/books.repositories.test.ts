import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  getBooksByUserId,
} from "@repositories/books.repository";
import prismaClient from "../../../common/utils/prisma";
import { Format } from "../../../modules/books/dtos/books.dto";

describe("Books Repository", () => {
  describe("getAllBooks", () => {
    it("should retrieve all books when no search term is provided", async () => {
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
          pdfLink: null,
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
        {
          id: 2,
          title: "The Hobbit 2",
          isbn: "978-3-16-148410-1",
          description: "A fantasy novel by J.R.R. Tolkien",
          publishDate: new Date("1954-07-30"),
          format: Format.PAPERBACK,
          language: "English",
          country: "United Kingdom",
          numOfPages: 310,
          pdfLink: null,
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

      jest.spyOn(prismaClient.book, "findMany").mockResolvedValue(mockBooks);

      const result = await getAllBooks({});

      expect(result).toEqual(mockBooks);
    });

    it("should handle empty database without errors", async () => {
      prismaClient.book.findMany = jest.fn().mockResolvedValue([]);

      const result = await getAllBooks({});

      expect(prismaClient.book.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
        include: {
          authors: true,
          genres: true,
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe("getBookById", () => {
    it("should return a book when given a valid ID", async () => {
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
        pdfLink: null,
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

      prismaClient.book.findUnique = jest.fn().mockResolvedValue(mockBook);

      const result = await getBookById(1);

      expect(prismaClient.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          authors: true,
          genres: true,
        },
      });
      expect(result).toEqual(mockBook);
    });

    it("should return null when given a negative ID", async () => {
      prismaClient.book.findUnique = jest.fn().mockResolvedValue(null);

      const result = await getBookById(-1);

      expect(prismaClient.book.findUnique).toHaveBeenCalledWith({
        where: { id: -1 },
        include: {
          authors: true,
          genres: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("createBook", () => {
    it("should create a book when valid data is provided", async () => {
      const createdBook = {
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.HARDCOVER,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://example.com/book.pdf",
        coverPicture: null,
        authors: [1],
        genres: [1],
      };

      prismaClient.book.create = jest.fn().mockResolvedValue(createdBook);

      const result = await createBook(createdBook);

      expect(prismaClient.book.create).toHaveBeenCalledWith({
        data: {
          ...createdBook,
          authors: {
            connect: createdBook.authors.map((id) => ({ id })),
          },
          genres: {
            connect: createdBook.genres.map((id) => ({ id })),
          },
        },
      });
      expect(result).toEqual(createdBook);
    });
    ///////////////////////////////////
    it("should return an empty array when userId does not exist", async () => {
      const nonExistentUserId = 999;

      prismaClient.book.findMany = jest.fn().mockResolvedValue([]);

      const result = await getBookById(nonExistentUserId);

      expect(prismaClient.book.findMany).toHaveBeenCalledWith({
        where: { id: nonExistentUserId },
        include: {
          authors: true,
          genres: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("updateBookById", () => {
    it("should update the book with only some fields provided", async () => {
      const bookId = 1;
      const updatedBook = {
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.HARDCOVER,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://example.com/book.pdf",
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
      };

      prismaClient.book.update = jest.fn().mockResolvedValue({
        id: bookId,
        ...updatedBook,
      });

      const result = await updateBookById(bookId, updatedBook);

      expect(result).toEqual({
        id: bookId,
        ...updatedBook,
      });
      expect(prismaClient.book.update).toHaveBeenCalledWith({
        where: { id: bookId },
        data: {
          ...updatedBook,
          authors: {
            set: updatedBook.authors.map((author) => ({ id: author.id })),
          },
          genres: {
            set: updatedBook.genres.map((genre) => ({ id: genre.id })),
          },
        },
      });
    });

    it("should throw an error when trying to update a non-existent Book", async () => {
      const mockUpdate = jest
        .spyOn(prismaClient.book, "update")
        .mockRejectedValue(new Error("Book not found"));

      const updatedBook = {
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.HARDCOVER,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://example.com/book.pdf",
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
      };

      await expect(updateBookById(999, updatedBook)).rejects.toThrow(
        "Book not found"
      );

      mockUpdate.mockRestore();
    });
  });

  describe("deleteBookById", () => {
    it("should delete a book when given a valid ID", async () => {
      const mockBook = { id: 1, title: "Test Book", author: "Test Author" };
      prismaClient.book.delete = jest.fn().mockResolvedValue(mockBook);

      const result = await deleteBookById(1);

      expect(prismaClient.book.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockBook);
    });

    it("should throw an error when given a non-existent ID", async () => {
      prismaClient.book.delete = jest
        .fn()
        .mockRejectedValue(new Error("Book not found"));

      await expect(deleteBookById(999)).rejects.toThrow("Book not found");

      expect(prismaClient.book.delete).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe("getBooksByUserId", () => {
    it("should retrieve books when given a valid userId", async () => {
      const mockUserId = 1;
      const mockBookshelves = [
        {
          id: 1,
          userId: mockUserId,
          books: [
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
              pdfLink: null,
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
            {
              id: 2,
              title: "The Hobbit 2",
              isbn: "978-3-16-148410-1",
              description: "A fantasy novel by J.R.R. Tolkien",
              publishDate: new Date("1954-07-30"),
              format: Format.PAPERBACK,
              language: "English",
              country: "United Kingdom",
              numOfPages: 310,
              pdfLink: null,
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
          ],
        },
      ];

      prismaClient.bookshelf.findMany = jest
        .fn()
        .mockResolvedValue(mockBookshelves);

      const result = await getBooksByUserId(mockUserId);

      expect(result).toEqual(mockBookshelves[0].books);
      expect(prismaClient.bookshelf.findMany).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: {
          books: {
            include: {
              authors: true,
              genres: true,
            },
          },
        },
      });
    });
    it("should return an empty array when userId does not exist in the database", async () => {
      const nonExistentUserId = 999;

      prismaClient.bookshelf.findMany = jest.fn().mockResolvedValue([]);

      const result = await getBooksByUserId(nonExistentUserId);

      expect(prismaClient.bookshelf.findMany).toHaveBeenCalledWith({
        where: { userId: nonExistentUserId },
        include: {
          books: {
            include: {
              authors: true,
              genres: true,
            },
          },
        },
      });
      expect(result).toEqual([]);
    });
  });
});
