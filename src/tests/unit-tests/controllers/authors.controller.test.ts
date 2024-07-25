import {
  createAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  getBooksByAuthorId,
  updateAuthorById,
} from "@modules/authors/authors.controller";
import authorsService from "@modules/authors/authors.service";
import { CreateAuthorDto } from "@modules/authors/dtos/create-author.dto";
import { UpdateAuthorDto } from "@modules/authors/dtos/update-author.dto";
import { Format } from "@modules/books/book-format.enum";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

describe("Authors Controller Unit Tests", () => {
  describe("get All Authors", () => {
    // Retrieves all authors successfully when valid query parameters are provided
    it("should retrieve all authors successfully when valid query parameters are provided", async () => {
      const req = {
        query: { term: "John" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const filter = plainToInstance(SearchQueryDto, req.query);
      const authors = [{ id: 1, name: "John Doe" }];
      jest.spyOn(authorsService, "getAllAuthors").mockResolvedValue(authors);

      await getAllAuthors(req, res);

      expect(authorsService.getAllAuthors).toHaveBeenCalledWith(filter);
      expect(res.send).toHaveBeenCalledWith(authors);
    });
  });
  describe("get Author By Id", () => {
    // Successfully retrieves an author by a valid authorId
    it("should return the author when a valid authorId is provided", async () => {
      const req = { params: { authorId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const author = { id: 1, name: "Author Name" };

      jest.spyOn(authorsService, "getAuthorById").mockResolvedValue(author);

      await getAuthorById(req, res);

      expect(authorsService.getAuthorById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(author);
    });
  });
  describe("create Author", () => {
    it("should create a new author when valid input data is provided", async () => {
      const req = {
        body: { name: "John Doe" },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createAuthorDto = plainToInstance(CreateAuthorDto, req.body);
      const newAuthor = { id: 1, name: "John Doe" };

      jest.spyOn(authorsService, "createAuthor").mockResolvedValue(newAuthor);

      await createAuthor(req, res);

      expect(authorsService.createAuthor).toHaveBeenCalledWith(createAuthorDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newAuthor);
    });
  });
  describe("update Author", () => {
    // Successfully updates an author when valid data is provided
    it("should update the author when valid data is provided", async () => {
      const req = {
        params: { authorId: "1" },
        body: { name: "Updated Author" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedAuthor = { id: 1, name: "Updated Author" };
      jest
        .spyOn(authorsService, "updateAuthorById")
        .mockResolvedValue(updatedAuthor);

      await updateAuthorById(req, res);

      expect(authorsService.updateAuthorById).toHaveBeenCalledWith(
        1,
        expect.any(UpdateAuthorDto)
      );
      expect(res.send).toHaveBeenCalledWith(updatedAuthor);
    });
  });
  describe("delete Author", () => {
    // Successfully delete an author by valid ID
    it("should delete an author when given a valid ID", async () => {
      const req = { params: { authorId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const mockDeletedAuthor = { id: 1, name: "Author Name" };

      jest
        .spyOn(authorsService, "deleteAuthorById")
        .mockResolvedValue(mockDeletedAuthor);

      await deleteAuthorById(req, res);

      expect(authorsService.deleteAuthorById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockDeletedAuthor);
    });
  });
  describe("get Author Books", () => {
    // Successfully retrieves books for a valid author ID
    it("should return books when a valid author ID is provided", async () => {
      const req = { params: { authorId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const books = [
        {
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
      ];

      jest.spyOn(authorsService, "getBooksByAuthorId").mockResolvedValue(books);

      await getBooksByAuthorId(req, res);

      expect(authorsService.getBooksByAuthorId).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(books);
    });
  });
});
