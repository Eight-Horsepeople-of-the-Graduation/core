import { Format } from "@modules/books/book-format.enum";
import {
  createGenre,
  deleteGenreById,
  getAllGenres,
  getBooksByGenreId,
  getGenreById,
  updateGenreById,
} from "@modules/genres/genres.controller";
import genresService from "@modules/genres/genres.service";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

describe("Genres Controller Unit Tests", () => {
  describe("getAllGenres", () => {
    // Retrieves all genres successfully with valid query parameters
    it("should retrieve all genres successfully when valid query parameters are provided", async () => {
      const req = {
        query: { name: "fiction" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const filter = plainToInstance(SearchQueryDto, req.query);
      const genres = [
        { id: 1, title: "fiction", books: [] as any[], description: "fiction" },
      ];

      jest.spyOn(genresService, "getAllGenres").mockResolvedValue(genres);

      await getAllGenres(req, res);

      expect(genresService.getAllGenres).toHaveBeenCalledWith(filter);
      expect(res.send).toHaveBeenCalledWith(genres);
    });
  });
  describe("getGenreById", () => {
    // Successfully retrieves a genre by a valid genreId
    it("should return genre when genreId is valid", async () => {
      const req = { params: { genreId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const genre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest.spyOn(genresService, "getGenreById").mockResolvedValue(genre);

      await getGenreById(req, res);

      expect(genresService.getGenreById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(genre);
    });
  });
  describe("getBooksByGenreId", () => {
    // Successfully retrieves books for a valid genre ID
    it("should return books when given a valid genre ID", async () => {
      const req = { params: { genreId: "1" } } as unknown as Request;
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

      jest.spyOn(genresService, "getBooksByGenreId").mockResolvedValue(books);

      await getBooksByGenreId(req, res);

      expect(genresService.getBooksByGenreId).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(books);
    });
  });
  describe("createGenre", () => {
    // Successfully creates a new genre when valid data is provided
    it("should create a new genre when valid data is provided", async () => {
      const req = {
        body: { name: "Fantasy" },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const createGenreDto = req.body;
      const newGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest.spyOn(genresService, "createGenre").mockResolvedValue(newGenre);

      await createGenre(req, res);

      expect(genresService.createGenre).toHaveBeenCalledWith(createGenreDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newGenre);
    });
  });
  describe("updateGenreById", () => {
    // Successfully updates a genre when valid genreId and updateGenreDto are provided
    it("should update the genre when valid genreId and updateGenreDto are provided", async () => {
      const req = {
        params: { genreId: "1" },
        body: { name: "Updated Genre" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };
      jest
        .spyOn(genresService, "updateGenreById")
        .mockResolvedValue(updatedGenre);

      await updateGenreById(req, res);

      expect(genresService.updateGenreById).toHaveBeenCalledWith(1, {
        name: "Updated Genre",
      });
      expect(res.send).toHaveBeenCalledWith(updatedGenre);
    });
  });
  describe("deleteGenreById", () => {
    // Successfully deletes a genre by a valid genre ID
    it("should delete the genre when a valid genre ID is provided", async () => {
      const req = { params: { genreId: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const mockDeletedGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest
        .spyOn(genresService, "deleteGenreById")
        .mockResolvedValue(mockDeletedGenre);

      await deleteGenreById(req, res);

      expect(genresService.deleteGenreById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockDeletedGenre);
    });
  });
});
