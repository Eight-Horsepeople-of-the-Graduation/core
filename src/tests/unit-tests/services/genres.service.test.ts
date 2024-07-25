import { Format } from "@modules/books/book-format.enum";
import booksRepository from "@modules/books/books.repository";
import genresRepository from "@modules/genres/genres.repository";
import {
  createGenre,
  deleteGenreById,
  getAllGenres,
  getBooksByGenreId,
  getGenreById,
  updateGenreById,
} from "@modules/genres/genres.service";

describe("Genres Service Unit Tests", () => {
  describe("getAllGenres", () => {
    // Retrieves all genres successfully when valid search query is provided
    it("should retrieve all genres when valid search query is provided", async () => {
      const searchQueryDto = { term: "fiction" };
      const mockGenres = [
        { id: 1, title: "fiction", books: [] as any[], description: "fiction" },
      ];

      jest
        .spyOn(genresRepository, "getAllGenres")
        .mockResolvedValue(mockGenres);

      const result = await getAllGenres(searchQueryDto);

      expect(genresRepository.getAllGenres).toHaveBeenCalledWith(
        searchQueryDto
      );
      expect(result).toEqual(mockGenres);
    });
  });
  describe("getGenreById", () => {
    it("should return genre when given a valid ID", async () => {
      const genreId = 1;
      const expectedGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest
        .spyOn(genresRepository, "getGenreById")
        .mockResolvedValue(expectedGenre);

      const result = await getGenreById(genreId);

      expect(result).toEqual(expectedGenre);
      expect(genresRepository.getGenreById).toHaveBeenCalledWith(genreId);
    });
  });
  describe("getBooksByGenreId", () => {
    // Retrieve books by valid genre ID
    it("should return books when given a valid genre ID", async () => {
      const genreId = 1;
      const mockBooks = [
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

      jest
        .spyOn(booksRepository, "getBooksByGenreId")
        .mockResolvedValue(mockBooks);

      const result = await getBooksByGenreId(genreId);

      expect(result).toEqual(mockBooks);
      expect(booksRepository.getBooksByGenreId).toHaveBeenCalledWith(genreId);
    });
  });
  describe("createGenre", () => {
    // Successfully creates a new genre with valid input
    it("should create a new genre when valid input is provided", async () => {
      const createGenreDto = {
        title: "Science Fiction",
        description: "This is a science fiction genre",
      };
      const expectedGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest
        .spyOn(genresRepository, "createGenre")
        .mockResolvedValue(expectedGenre);

      const result = await createGenre(createGenreDto);

      expect(result).toEqual(expectedGenre);
      expect(genresRepository.createGenre).toHaveBeenCalledWith(createGenreDto);
    });
  });
  describe("updateGenreById", () => {
    // Successfully updates a genre when valid genreId and updateGenreDto are provided
    it("should update the genre when valid genreId and updateGenreDto are provided", async () => {
      const genreId = 1;
      const updateGenreDto = { title: "Updated Genre", description: "Updated" };
      const updatedGenre = { id: genreId, ...updateGenreDto };

      jest
        .spyOn(genresRepository, "updateGenreById")
        .mockResolvedValue(updatedGenre);

      const result = await updateGenreById(genreId, updateGenreDto);

      expect(result).toEqual(updatedGenre);
      expect(genresRepository.updateGenreById).toHaveBeenCalledWith(
        genreId,
        updateGenreDto
      );
    });
  });
  describe("deleteGenreById", () => {
    // Successfully delete a genre by a valid genre ID
    it("should return the deleted genre when a valid genre ID is provided", async () => {
      const genreId = 1;
      const mockDeletedGenre = {
        id: 1,
        title: "fiction",
        books: [] as any[],
        description: "fiction",
      };

      jest
        .spyOn(genresRepository, "deleteGenreById")
        .mockResolvedValue(mockDeletedGenre);

      const result = await deleteGenreById(genreId);

      expect(result).toEqual(mockDeletedGenre);
      expect(genresRepository.deleteGenreById).toHaveBeenCalledWith(genreId);
    });
  });
});
