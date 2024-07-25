import { Privacy } from "@modules/bookshelves/bookshelf-privacy.enum";
import bookshelvesRepository from "@modules/bookshelves/bookshelves.repository";
import bookshelvesService, {
  addBookToBookshelf,
  createBookshelf,
  deleteBookshelf,
  getAllBookshelves,
  getBookshelfById,
  removeBooksFromBookshelf,
  updateBookshelf,
} from "@modules/bookshelves/bookshelves.service";

describe("Bookshelves Service Unit Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("getBookshelves", () => {
    // Retrieves all bookshelves successfully when valid search query is provided
    it("should retrieve all bookshelves when valid search query is provided", async () => {
      const searchQueryDto = { term: "fiction" };
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
        .spyOn(bookshelvesRepository, "getAllBookshelves")
        .mockResolvedValue(mockBookshelves);

      const result = await getAllBookshelves(searchQueryDto);

      expect(result).toEqual(mockBookshelves);
      expect(bookshelvesRepository.getAllBookshelves).toHaveBeenCalledWith(
        searchQueryDto
      );
    });
    // Handles cases where searchQueryDto is null or undefined
    it("should handle null or undefined searchQueryDto", async () => {
      jest
        .spyOn(bookshelvesRepository, "getAllBookshelves")
        .mockResolvedValue([]);

      const resultWithNull = await getAllBookshelves(null);
      const resultWithUndefined = await getAllBookshelves(undefined);

      expect(resultWithNull).toEqual([]);
      expect(resultWithUndefined).toEqual([]);
      expect(bookshelvesRepository.getAllBookshelves).toHaveBeenCalledWith(
        null
      );
      expect(bookshelvesRepository.getAllBookshelves).toHaveBeenCalledWith(
        undefined
      );
    });
  });
  describe("getBookshelfById", () => {
    // Retrieves bookshelf by valid ID
    it("should return bookshelf when given a valid ID", async () => {
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
      const bookshelfId = 1;
      jest
        .spyOn(bookshelvesRepository, "getBookshelfById")
        .mockResolvedValue(mockBookshelf);

      const result = await getBookshelfById(bookshelfId);

      expect(result).toEqual(mockBookshelf);
      expect(bookshelvesRepository.getBookshelfById).toHaveBeenCalledWith(
        bookshelfId
      );
    });
    // Handles non-existent bookshelf ID
    it("should return null when given a non-existent ID", async () => {
      const bookshelfId = 999;
      jest
        .spyOn(bookshelvesRepository, "getBookshelfById")
        .mockResolvedValue(null);

      const result = await getBookshelfById(bookshelfId);

      expect(result).toBeNull();
      expect(bookshelvesRepository.getBookshelfById).toHaveBeenCalledWith(
        bookshelfId
      );
    });
  });
  describe("createBookshelf", () => {
    // Successfully creates a bookshelf with valid data
    it("should create a bookshelf when valid data is provided", async () => {
      const data = {
        title: "My Bookshelf",
        userId: 1,
        description: "Fisadasda",
        privacy: Privacy.PUBLIC,
      };
      const expectedBookshelf = {
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
        .spyOn(bookshelvesRepository, "createBookshelf")
        .mockResolvedValue(expectedBookshelf);

      jest
        .spyOn(bookshelvesRepository, "getBookshelvesByUserId")
        .mockResolvedValue([] as any);
      const result = await createBookshelf(data);

      expect(result).toEqual(expectedBookshelf);
      expect(bookshelvesRepository.createBookshelf).toHaveBeenCalledWith(data);
    });
  });
  describe("addBookToBookshelf", () => {
    // Successfully adds a single book to a bookshelf
    it("should successfully add a single book to a bookshelf", async () => {
      const booksheflId = 1;
      const bookIds = [101];
      const mockUpdatedBookshelf = {
        id: booksheflId,
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
        .spyOn(bookshelvesRepository, "addBooksToBookshelf")
        .mockResolvedValue(mockUpdatedBookshelf);

      const result = await addBookToBookshelf(booksheflId, bookIds);

      expect(result).toEqual(mockUpdatedBookshelf);
      expect(bookshelvesRepository.addBooksToBookshelf).toHaveBeenCalledWith(
        booksheflId,
        bookIds
      );
    });
    // Adding books to a non-existent bookshelf ID
    it("should throw an error when adding books to a non-existent bookshelf ID", async () => {
      const booksheflId = 999;
      const bookIds = [101];
      const mockError = new Error("Bookshelf not found");

      jest
        .spyOn(bookshelvesRepository, "addBooksToBookshelf")
        .mockRejectedValue(mockError);

      await expect(addBookToBookshelf(booksheflId, bookIds)).rejects.toThrow(
        "Bookshelf not found"
      );
      expect(bookshelvesRepository.addBooksToBookshelf).toHaveBeenCalledWith(
        booksheflId,
        bookIds
      );
    });
  });
  describe("removeBooksFromBookshelf", () => {
    // Successfully removes books from a bookshelf when valid bookshelfId and bookIds are provided
    it("should remove books from bookshelf when valid bookshelfId and bookIds are provided", async () => {
      const bookshelfId = 1;
      const bookIds = [101, 102];
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
        .spyOn(bookshelvesRepository, "removeBooksFromBookshelf")
        .mockResolvedValue(updatedBookshelf);

      const result = await removeBooksFromBookshelf(bookshelfId, bookIds);

      expect(result).toEqual(updatedBookshelf);
      expect(
        bookshelvesRepository.removeBooksFromBookshelf
      ).toHaveBeenCalledWith(bookshelfId, bookIds);
    });
    // bookshelfId does not exist in the repository
    it("should throw an error when bookshelfId does not exist", async () => {
      const bookshelfId = 999;
      const bookIds = [101, 102];

      jest
        .spyOn(bookshelvesRepository, "removeBooksFromBookshelf")
        .mockRejectedValue(new Error("Bookshelf not found"));

      await expect(
        removeBooksFromBookshelf(bookshelfId, bookIds)
      ).rejects.toThrow("Bookshelf not found");
      expect(
        bookshelvesRepository.removeBooksFromBookshelf
      ).toHaveBeenCalledWith(bookshelfId, bookIds);
    });
  });
  describe("updateBookshelf", () => {
    // Successfully updates a bookshelf with valid ID and data
    it("should update the bookshelf when given a valid ID and data", async () => {
      const bookshelfId = 1;
      const updateBookshelfDto = { title: "Updated Bookshelf" };
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
        .spyOn(bookshelvesRepository, "updateBookshelf")
        .mockResolvedValue(updatedBookshelf);

      const result = await updateBookshelf(bookshelfId, updateBookshelfDto);

      expect(result).toEqual(updatedBookshelf);
      expect(bookshelvesRepository.updateBookshelf).toHaveBeenCalledWith(
        bookshelfId,
        updateBookshelfDto
      );
    });
    // Handles non-existent bookshelf ID gracefully
    it("should handle non-existent bookshelf ID gracefully", async () => {
      const bookshelfId = 999;
      const updateBookshelfDto = { title: "Non-existent Bookshelf" };

      jest
        .spyOn(bookshelvesRepository, "updateBookshelf")
        .mockRejectedValue(new Error("Bookshelf not found"));

      // Try to update the bookshelf (expect an error)
      await expect(
        updateBookshelf(bookshelfId, updateBookshelfDto)
      ).rejects.toThrow("Bookshelf not found");
      expect(bookshelvesRepository.updateBookshelf).toHaveBeenCalledWith(
        bookshelfId,
        updateBookshelfDto
      );
    });
  });
  describe("deleteBookshelf", () => {
    // Successfully deletes a bookshelf by its ID
    it("should successfully delete a bookshelf by its ID", async () => {
      const bookshelfId = 2;
      const mockDeletedBookshelf = {
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
        .spyOn(bookshelvesRepository, "deleteBookshelf")
        .mockResolvedValue(mockDeletedBookshelf);

      const result = await deleteBookshelf(bookshelfId);

      expect(result).toEqual(mockDeletedBookshelf);
      expect(bookshelvesRepository.deleteBookshelf).toHaveBeenCalledWith(
        bookshelfId
      );
    });

    // Attempt to delete a bookshelf with a non-existent ID
    it("should throw an error when attempting to delete a bookshelf with a non-existent ID", async () => {
      const nonExistentBookshelfId = 999;

      jest
        .spyOn(bookshelvesRepository, "deleteBookshelf")
        .mockRejectedValue(new Error("Bookshelf not found"));

      await expect(deleteBookshelf(nonExistentBookshelfId)).rejects.toThrow(
        "Bookshelf not found"
      );
      expect(bookshelvesRepository.getBookshelfById).toHaveBeenCalledWith(
        nonExistentBookshelfId
      );
    });
  });
});
