import authorsRepository from "@modules/authors/authors.repository";
import {
  createAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  getBooksByAuthorId,
  updateAuthorById,
} from "@modules/authors/authors.service";
import { Format } from "@modules/books/book-format.enum";
import booksRepository from "@modules/books/books.repository";

describe("Authors Service Unit Tests", () => {
  describe("get All Authors", () => {
    it("should retrieve all authors when given a valid search query", async () => {
      const mockAuthors = [
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
      ];
      const mockSearchQuery = { term: "Author" };

      jest
        .spyOn(authorsRepository, "getAllAuthors")
        .mockResolvedValue(mockAuthors);

      const result = await getAllAuthors(mockSearchQuery);

      expect(result).toEqual(mockAuthors);
      expect(authorsRepository.getAllAuthors).toHaveBeenCalledWith(
        mockSearchQuery
      );
    });
  });
  describe("get Author By Id", () => {
    // Retrieves author by valid ID
    it("should return author when valid ID is provided", async () => {
      const mockAuthor = { id: 1, name: "John Doe" };
      jest
        .spyOn(authorsRepository, "getAuthorById")
        .mockResolvedValue(mockAuthor);

      const result = await getAuthorById(1);

      expect(result).toEqual(mockAuthor);
      expect(authorsRepository.getAuthorById).toHaveBeenCalledWith(1);
    });
  });
  describe("create Author", () => {
    // Successfully creates a new author with valid data
    it("should create a new author when valid data is provided", async () => {
      const createAuthorDto = { name: "John Doe", birthdate: "1980-01-01" };
      const expectedAuthor = {
        id: 1,
        name: "John Doe",
        birthdate: "1980-01-01",
      };

      jest
        .spyOn(authorsRepository, "createAuthor")
        .mockResolvedValue(expectedAuthor);

      const result = await createAuthor(createAuthorDto);

      expect(result).toEqual(expectedAuthor);
      expect(authorsRepository.createAuthor).toHaveBeenCalledWith(
        createAuthorDto
      );
    });
  });
  describe("update Author", () => {
    // Successfully updates an existing author with valid data
    it("should update the author when valid data is provided", async () => {
      const authorId = 1;
      const updateAuthorDto = { name: "Updated Author" };
      const updatedAuthor = { id: 1, name: "Updated Author" };

      jest
        .spyOn(authorsRepository, "updateAuthorById")
        .mockResolvedValue(updatedAuthor);

      const result = await updateAuthorById(authorId, updateAuthorDto);

      expect(result).toEqual(updatedAuthor);
      expect(authorsRepository.updateAuthorById).toHaveBeenCalledWith(
        authorId,
        updateAuthorDto
      );
    });
  });
  describe("delete Author", () => {
    // Successfully delete an existing author by ID
    it("should successfully delete an existing author by ID", async () => {
      const authorId = 1;
      const mockAuthor = { id: authorId, name: "John Doe" };

      jest
        .spyOn(authorsRepository, "deleteAuthorById")
        .mockResolvedValue(mockAuthor);

      const result = await deleteAuthorById(authorId);

      expect(result).toEqual(mockAuthor);
      expect(authorsRepository.deleteAuthorById).toHaveBeenCalledWith(authorId);
    });
  });
  describe("get Author Books", () => {
    // Retrieve books for a valid author ID
    it("should return books when author ID is valid", async () => {
      const authorId = 1;
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
        .spyOn(booksRepository, "getBooksByAuthorId")
        .mockResolvedValue(mockBooks);

      const result = await getBooksByAuthorId(authorId);

      expect(result).toEqual(mockBooks);
      expect(booksRepository.getBooksByAuthorId).toHaveBeenCalledWith(authorId);
    });
  });
});
